// Middleware for checking JWT token
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Extract token from header
    console.log("Received Token:", token); // Check if token is received
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized Access: Token missing" });
    }
    const decodedToken = jwt.verify(token, JWT_SECRET);
    console.log("Decoded Token:", decodedToken); // Check decoded token
    req.userData = { email: decodedToken.email, adminId: decodedToken.adminId };
    next();
  } catch (error) {
    console.error("Token Error:", error); // Log token errors
    return res
      .status(401)
      .json({ message: "Unauthorized Access: Invalid Token" });
  }
};

module.exports = auth;
