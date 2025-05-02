import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ success: false, error: "Access denied. No token provided." });
    }

    const tokenValue = token.startsWith("Bearer ") ? token.split(" ")[1] : token;
    const decoded = jwt.verify(tokenValue, process.env.JWT_KEY);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({ success: false, error: "Invalid or expired token." });
  }
};

export default authMiddleware;
