import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN_SECRET;

const verifyjwt = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).send("Please Login"); //unAuthorizied

  const token = authHeader.split(" ")[1];

  jwt.verify(token, ACCESS_TOKEN, (err, decoded) => {
    if (err) return res.status(403).send("invalid Token");
    req.username = decoded.username;
    next();
  });
};

export { verifyjwt };
