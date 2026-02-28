import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    console.log(db.connection.host);
  } catch (error) {
    console.log("db connection failed", error.message);
    process.exit(1);
  }
};

export default connectDb;
