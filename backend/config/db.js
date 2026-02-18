import mongoose from "mongoose";

async function connectDataBase() {
  try {
    // await mongoose.connect("mongodb://localhost:27017/ssiText");
    // await mongoose.connect("mongodb+srv://username:password@cluster0.prf8n.mongodb.net/?appName=Cluster0");
    await mongoose.connect("mongodb://username:password@cluster0-shard-00-01.prf8n.mongodb.net:27017,cluster0-shard-00-02.prf8n.mongodb.net:27017,cluster0-shard-00-00.prf8n.mongodb.net:27017/SDFDSFDSFDS?tls=true&authSource=admin");
    console.log("Mongodb is connected");
  } catch (error) {
    console.log(error.message);
  }
}
export default connectDataBase;
