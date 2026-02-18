import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import checkToken from "../middlewares/CheckToken.js";
const router = express.Router();

router.post("/signup", async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email: email });
  console.log(existing, "existing");

  // if (!!existing === true) {
  //   return res.json({ msg: "Email is already Registered" });
  // }
  if (existing) {
    return res.json({ msg: "Email is already Registered" });
  }
  const newUser = await User.create({
    name: name,
    email: email,
    passwordOfUser: password,
  });

  return res.status(201).json(newUser);
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  // const frontendEmail = req.body.email;
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email: email });
  // console.log(existingUser);
  if (!existingUser) {
    return res.json({ msg: "User is not found.", login: false });
  }

  if (existingUser.passwordOfUser !== password) {
    return res.json({ msg: "Password is not correct", login: false });
  }
  // const pass = "2324@abc";
  const token = jwt.sign({ userId: existingUser._id }, "pass@123"); // to generate tokens
  console.log(token);

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
  });

  return res.status(200).json({ msg: "Login is Successfully", login: true });
});


router.get('/me', checkToken, async (req, res) => {
  console.log(req.user);
  const user = await User.findById(req.user);
  console.log(user);

  return res.status(200).json({ user })

})
export default router;
