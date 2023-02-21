import db from "../models/index.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN_SECRET;

const Client = db.clients;
const Admin = db.admins;
const Vendor = db.vendors;

const clientRefreshToken = async (req, res) => {
  const cookie = req.cookies.jwt;
  if (!cookie) return res.status(401).send("No Refresh cookie set");
  const refreshtoken = cookie;

  jwt.verify(refreshtoken, REFRESH_TOKEN, async (err, decoded) => {
    const foundClient = await Client.findOne({ where: { id: decoded.id } });

    // checking if user have a refresh token in DB
    if (!foundClient.refreshToken)
      return res.status(401).send("No refresh Token found for this user"); // no RT for client

    if (err || decoded.username !== foundClient.username)
      return res.status(403).send("Error or invalid RT ");

    // Generating a new token for the same user
    const client = {
      id: decoded.id,
      username: decoded.username,
    };

    const accesstoken = jwt.sign(client, ACCESS_TOKEN, { expiresIn: "40s" });
    res
      .status(200)
      .json({ accesstoken, NB: "this only work if user is logged in" });
  });
};

const adminRefreshToken = async (req, res) => {
  const cookie = req.cookies.jwt;
  if (!cookie) return res.status(401).send("No Refresh cookie set");
  const refreshtoken = cookie;

  jwt.verify(refreshtoken, REFRESH_TOKEN, async (err, decoded) => {
    const foundAdmin = await Admin.findOne({ where: { id: decoded.id } });

    // checking if user have a refresh token in DB
    if (!foundAdmin.refreshToken)
      return res.status(401).send("No refresh Token found for this user"); // no RT for client

    if (err || decoded.username !== foundAdmin.username)
      return res.status(403).send("Error or invalid RT ");

    // Generating a new token for the same user
    const admin = {
      id: decoded.id,
      username: decoded.username,
    };

    const accesstoken = jwt.sign(admin, ACCESS_TOKEN, { expiresIn: "40s" });
    res.status(200).json({ accesstoken });
  });
};

const vendorRefreshToken = async (req, res) => {
  const cookie = req.cookies.jwt;
  if (!cookie) return res.status(401).send("No Refresh cookie set");
  const refreshtoken = cookie;

  jwt.verify(refreshtoken, REFRESH_TOKEN, async (err, decoded) => {
    const foundVendor = await Vendor.findOne({ where: { id: decoded.id } });

    // checking if user have a refresh token in DB
    if (!foundVendor.refreshToken)
      return res.status(401).send("No refresh Token found for this user"); // no RT for client

    if (err || decoded.username !== foundVendor.username)
      return res.status(403).send("Error or invalid RT ");

    // Generating a new token for the same user
    const vendor = {
      id: decoded.id,
      username: decoded.username,
    };

    const accesstoken = jwt.sign(vendor, ACCESS_TOKEN, { expiresIn: "40s" });
    res.status(200).json({ accesstoken });
  });
};

export { clientRefreshToken, adminRefreshToken, vendorRefreshToken };
