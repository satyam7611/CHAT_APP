import Conversation from "../models/conversation.models.js";
import Message from "../models/message.models.js";
import { getReceiverSocketId, io } from "../SocketIO/server.js";
import { cloudinary } from "../config/cloudinary.js";

export const sendMessage = async (req, res) => {
  console.log("send message to satyam singh ", req.params.id, req.body.message);

  try {
    let { message, duration } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    // Handle file attachment
    let fileUrl = "";
    let fileType = "";
    let public_id = "";
    let originalName = "";
    if (req.file) {
      fileUrl = req.file.path; // Cloudinary secure URL
      fileType = req.file.mimetype;
      public_id = req.file.filename; // Cloudinary public_id
      originalName = req.file.originalname;
    }

    // Default message fallback if only sending a file
    if (!message && fileUrl) {
      message = "";
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // create conversation if not exist
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // create message
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
      fileUrl,
      fileType,
      public_id,
      originalName,
      duration: duration ? Number(duration) : 0
    });

    // push message id to conversation
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json({
      message: "Message sent successfully!",
      newMessage,
    });

  } catch (error) {
    console.log("err", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: chatPartnerId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, chatPartnerId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]);
    }

    // Mark messages sent by chatPartnerId to me as read
    await Message.updateMany(
      { senderId: chatPartnerId, receiverId: senderId, isRead: false },
      { $set: { isRead: true } }
    );

    res.status(200).json(conversation.messages);

  } catch (error) {
    console.log("error in getMessages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUnreadCounts = async (req, res) => {
  try {
    const userId = req.user._id;

    const unreadMessages = await Message.aggregate([
      { $match: { receiverId: userId, isRead: false } },
      { $group: { _id: "$senderId", count: { $sum: 1 } } }
    ]);

    const unreadCounts = {};
    unreadMessages.forEach(item => {
      unreadCounts[item._id] = item.count;
    });

    res.status(200).json(unreadCounts);
  } catch (error) {
    console.log("error in getUnreadCounts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { id: messageId } = req.params;
    const senderId = req.user._id;

    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    if (String(message.senderId) !== String(senderId)) {
      return res.status(401).json({ message: "You can only delete your own messages" });
    }

    message.isDeleted = true;
    message.message = "This message was deleted";

    // Delete attachment from Cloudinary if it exists
    if (message.public_id) {
      let resourceType = "image";
      if (message.fileType?.startsWith("video/")) {
        resourceType = "video";
      } else if (message.fileType?.startsWith("audio/")) {
        resourceType = "video"; // Cloudinary treats audio as 'video'
      } else if (!message.fileType?.startsWith("image/")) {
        resourceType = "raw"; // PDFs, docs, general files
      }
      try {
        await cloudinary.uploader.destroy(message.public_id, { resource_type: resourceType });
      } catch (cloudinaryErr) {
        console.error("Cloudinary deletion failed:", cloudinaryErr);
      }
    }

    await message.save();

    // Emit real-time event to the receiver
    const receiverSocketId = getReceiverSocketId(message.receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("messageDeleted", { messageId: message._id });
    }

    res.status(200).json({ message: "Message deleted successfully", deletedMessageId: message._id });
  } catch (error) {
    console.log("error in deleteMessage:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};