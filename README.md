# 💬 Real-Time Chat Application | MERN + Socket.io

A fully functional real-time chat application inspired by WhatsApp, built using the **MERN Stack** (**MongoDB, Express.js, React.js, Node.js**). The application enables instant messaging, secure authentication, online status tracking, and file sharing with real-time communication powered by **Socket.io**.

---

## 🚀 Features

- ⚡ Real-Time Messaging using Socket.io (Bi-directional Communication)
- 🟢 Live Online/Offline Status updates instantly
- 📎 File Sharing Support using Multer (Images, PDFs, Videos)
- 🖼️ Image Preview Lightbox (Fullscreen view + Download option)
- 🗑️ Delete for Everyone (Real-time message removal)
- 🔔 Unread Message Notifications
- 🔍 Search Contacts (Instant filtering using Zustand)
- 🕒 Smart Timestamps & Date Separators
- 🔐 JWT Authentication stored securely in HTTP-only cookies
- 🍞 Toast Notifications using React Hot Toast

---

## 🧠 How It Works

1. User logs in securely  
2. JWT token is stored in HTTP-only cookies  
3. Socket connection gets established  
4. Messages are sent using Socket.io  
5. Messages are stored in MongoDB  
6. Receiver gets messages instantly without page refresh  

---

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- Zustand (State Management)
- TailwindCSS + DaisyUI
- Socket.io Client
- React Hook Form
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Socket.io
- Multer (File Uploads)
- JWT Authentication

---

## 📁 Project Structure

```bash
CHAT_APP/
│
├── Backend/
├── Frontend/
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone <your-repository-link>
cd CHAT_APP
```

### 2️⃣ Setup Backend

```bash
cd Backend
npm install
```

Create a `.env` file inside the Backend folder:

```env
PORT=3000
MONGO_URI=your_mongodb_connection
JWT_KEY=your_secret_key
```

Run the backend server:

```bash
npm run dev
```

### 3️⃣ Setup Frontend

```bash
cd ../Frontend
npm install
npm run dev
```

### 4️⃣ Open the Application

```bash
http://localhost:5173
```

---

## 🌟 Future Improvements

- ✍️ Typing Indicators
- 👥 Group Chat Support
- 😀 Message Reactions
- 📲 Push Notifications

---

## 📄 License

This project is open-source and available for learning and customization.

---

## 🙌 Author

**Satyam Singh**
