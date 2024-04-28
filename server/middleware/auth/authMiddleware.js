const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("Authorization");

  console.log("Token received:", token);

  // Check if no token
  if (!token) {
    console.log("No token found");
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Token verified successfully");
    req.admin = decoded.admin;
    next();
  } catch (err) {
    console.error("Error in token verification:", err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
