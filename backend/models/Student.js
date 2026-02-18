import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  fName: String,
  rollNo: Number,
});

const Student = mongoose.model("Student", studentSchema);
export default Student;
