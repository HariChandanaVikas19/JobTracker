const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401);
    throw new Error("Authorization token is missing");
  }

  const token = authHeader.split(" ")[1];
  try {
    req.user = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
      console.log("JWT error:", err.message);   // add this line
    res.status(401);
    throw new Error("User is not authorized or token expired");
  }

  next();
});

module.exports = validateToken;