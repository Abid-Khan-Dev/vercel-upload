import jwt from "jsonwebtoken";

// middleware
const checkToken = (req, res, next) => {
  // const token = req.cookies.token;
  const token = req.cookies.token;
  console.log(req.cookies.token, "req.cookies");
  if (!token) return res.status(401).json({ msg: "Token is required" });
  try {
    const decoded = jwt.verify(token, "pass@123"); // to reverse token to its original form
    console.log(decoded, "decoded");
    req.user = decoded.userId;
    next(); /// move to next function
  } catch (error) {
    console.log(error.message);
    return res.status(401).json(error.message);
  }
};

export default checkToken;
