const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];

  if (token) {
    token = token.split(" ")[1]; // remove "Bearer"
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(400).json({ message: "Invalid token" });
      } else {
        req.user = decoded; // attach user to request
        next(); // ✅ move inside callback
      }
    });
  } else {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }
};

module.exports = verifyToken;
