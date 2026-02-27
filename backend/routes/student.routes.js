import express from "express";
import Student from "../models/Student.js";
import checkToken from "../middlewares/CheckToken.js";

const router = express.Router();

// get All Students2
//  /students
router.get("/", checkToken, async (req, res) => {
  console.log(req.query);
  // const { search } = req.query;
  const page = Number(req.query.page);
  const limit = Number(req.query.limit)
  const skip = (page - 1) * limit;
  // const filter = search ? { name: { $regex: search, $options: 'i' } } : {};

  // const students = search ? await Student.find({ name: { $regex: search, $options: 'i' } }) : await Student.find().sort({ 'createdAt': -1 });
  const students = await Student.find().sort({ 'createdAt': -1 }).limit(limit).skip(skip);

  const totalStudents = await Student.countDocuments()
  const totalPages = Math.ceil(totalStudents / limit) // 21 docs page 3 
  return res.status(200).json({ students, totalStudents, totalPages });
});

//  /students/create
router.post("/create", checkToken, async (req, res) => {
  try {
    // console.log(req.body);
    const { name, fName, rollNo } = req.body;
    await Student.create({
      name,
      fName,
      rollNo,
    });
    return res.status(201).json({ msg: "Student is created", success: true });
  } catch (error) {
    return res.status(500).json("Internal Server error");
  }
});

//  /students/update
router.post("/update", checkToken, async (req, res) => {
  // console.log(req.body);
  const { Id, name, fName, rollNo } = req.body;
  const updatedStudents = await Student.findByIdAndUpdate(
    Id,
    {
      name,
      fName,
      rollNo,
    },
    { new: true }
  );
  console.log(updatedStudents, "updatedStudents");

  return res.json(updatedStudents);
});

// delete Students
router.post("/delete", checkToken, async (req, res) => {
  console.log('fdsfdsfds');

  try {



    const { id } = req.body;
    console.log(req.body);
    await Student.findByIdAndDelete(id);

    return res.json({ success: true });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Internal Server error");
  }
});
export default router;
