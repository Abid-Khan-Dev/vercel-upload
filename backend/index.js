import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import connectDataBase from "./config/db.js";
import Student from "./models/Student.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import checkToken from "./middlewares/CheckToken.js";
import User from "./models/User.js";

const app = express();

connectDataBase();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // frontend url to allow
    credentials: true, /// for cookies
  })
);

app.get("/", (req, res) => {
  res.json("Working");
});

// app.post("/signup", async (req, res) => {
//   console.log(req.body);
//   const { name, email, password } = req.body;
//   const existing = await User.findOne({ email: email });
//   console.log(existing, "existing");

//   // if (!!existing === true) {
//   //   return res.json({ msg: "Email is already Registered" });
//   // }
//   if (existing) {
//     return res.json({ msg: "Email is already Registered" });
//   }
//   const newUser = await User.create({
//     name: name,
//     email: email,
//     passwordOfUser: password,
//   });

//   return res.status(201).json(newUser);
// });

// app.post("/login", async (req, res) => {
//   console.log(req.body);
//   // const frontendEmail = req.body.email;
//   const { email, password } = req.body;
//   const existingUser = await User.findOne({ email: email });
//   // console.log(existingUser);
//   if (!existingUser) {
//     return res.json({ msg: "User is not found.", login: false });
//   }

//   if (existingUser.passwordOfUser !== password) {
//     return res.json({ msg: "Password is not correct", login: false });
//   }
//   // const pass = "2324@abc";
//   const token = jwt.sign({ id: existingUser._id }, "pass@123"); // to generate tokens
//   console.log(token);

//   res.cookie("token", token, {
//     httpOnly: true,
//     sameSite: "lax",
//   });

//   return res.status(200).json({ msg: "Login is Successfully", login: true });
// });
import authRoutes from "./routes/auth.routes.js";
app.use("/", authRoutes);

import StudentRoutes from "./routes/student.routes.js";
app.use("/students", StudentRoutes);

// get All Students2
// app.get("/students", checkToken, async (req, res) => {
//   // console.log(req.body);
//   const students = await Student.find();
//   return res.status(200).json({ students });
// });

// create Students
// app.post("/students/create", checkToken, async (req, res) => {
//   try {
//     // console.log(req.body);
//     const { name, fName, rollNo } = req.body;
//     await Student.create({
//       name,
//       fName,
//       rollNo,
//     });
//     return res.status(201).json({ msg: "Student is created", success: true });
//   } catch (error) {
//     return res.status(500).json("Internal Server error");
//   }
// });

// update Students
// app.post("/students/update", checkToken, async (req, res) => {
//   console.log(req.body);
//   const { Id, name, fName, rollNo } = req.body;
//   const updatedStudents = await Student.findByIdAndUpdate(
//     Id,
//     {
//       name,
//       fName,
//       rollNo,
//     },
//     { new: true }
//   );
//   console.log(updatedStudents, "updatedStudents");

//   return res.json(updatedStudents);
// });

// delete Students
app.post("/students/delete", checkToken, async (req, res) => {
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

app.listen(3000, () => {
  console.log("Backend is running on port 3000");
});
