import mongoose from "mongoose";

async function connectDataBase() {
  try {
    // await mongoose.connect("mongodb://localhost:27017/ssiText");
    // await mongoose.connect("mongodb+srv://username:password@cluster0.prf8n.mongodb.net/?appName=Cluster0");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongodb is connected");
  } catch (error) {
    console.log(error.message);
  }
}
export default connectDataBase;
