import jwt from "jsonwebtoken";

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json({ msg: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

export { authenticate };