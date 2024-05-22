const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.admin = decoded.admin;
    next();
  } catch (err) {
    console.error("Error in token verification:", err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
