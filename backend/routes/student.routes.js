import express from "express";
import Student from "../models/Student.js";
import checkToken from "../middlewares/CheckToken.js";

const router = express.Router();

// get All Students2
//  /students
router.get("/", checkToken, async (req, res) => {
  console.log(req.user);
  const students = await Student.find();
  return res.status(200).json({ students });
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

export default router;
