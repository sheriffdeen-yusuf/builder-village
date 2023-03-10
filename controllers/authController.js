import db from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN_SECRET;

const Client = db.clients;
const Admin = db.admins;
const Vendor = db.vendors;

// Handle Client Login
const handleClientLogin = async (req, res) => {
  const { password, email } = req.body;
  // check if client exist
  const foundClient = await Client.findOne({ where: { email: email } });
  if (!foundClient) {
    return res.status(401).send("User does not exit!"); //unAuthorized
  } else if (foundClient && !foundClient.verify) {
    return res
      .status(401)
      .send(
        "Please kindly check your mail. You cannot access your account, untill is activated"
      );
  }

  const match = await bcrypt.compare(password, foundClient.password);
  if (match) {
    const client = {
      id: foundClient.id,
      username: foundClient.username,
    };

    // create token
    const accesstoken = jwt.sign(client, ACCESS_TOKEN, { expiresIn: "1m" });
    const refreshtoken = jwt.sign(client, REFRESH_TOKEN, { expiresIn: "40m" });

    // setting refreshToken in httpOnly cookie
    res.cookie("jwt", refreshtoken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1000,
    });

    const cookie = req.cookies;
    if (!cookie?.jwt)
      return res.status(403).send("Could not save refresh Token");
    // saving refresh token for this client
    await Client.update(
      { refreshToken: refreshtoken },
      { where: { id: foundClient.id } }
    );

    // res.status(200).json({ accesstoken });
    res.status(200).json({
      success: `Welcome back ${foundClient.username}`,
      accesstoken,
    });
  } else {
    res.status(403).send("incorrect Password or user");
  }
};

// Handle Admin Login
const handleAdminLogin = async (req, res) => {
  const { password, email } = req.body;
  // check if client exist
  const foundAdmin = await Admin.findOne({ where: { email: email } });
  if (!foundAdmin) res.sendStatus(401); //unAuthorized

  const match = await bcrypt.compare(password, foundAdmin.password);
  if (match) {
    const admin = {
      id: foundAdmin.id,
      username: foundAdmin.username,
    };
    // create token
    const accesstoken = jwt.sign(admin, ACCESS_TOKEN, { expiresIn: "40s" });
    const refreshtoken = jwt.sign(admin, REFRESH_TOKEN, { expiresIn: "40m" });
    // setting refreshToken in httpOnly cookie
    res.cookie("jwt", refreshtoken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1000,
    });

    const cookie = req.cookies;
    if (!cookie?.jwt)
      return res.status(403).send("Could not save refresh Token");
    // saving refresh token for this client
    await Admin.update(
      { refreshToken: refreshtoken },
      { where: { id: foundAdmin.id } }
    );

    res.status(200).json({ accesstoken });
    // res.status(200).send(`Login ${foundAdmin.username} SUCESS`);
  } else {
    return res.status(403).send("incorrect Password or username");
  }
};

// Handle Vendor Login
const handleVendorLogin = async (req, res) => {
  const { password, email } = req.body;
  // check if client exist
  const foundVendor = await Vendor.findOne({ where: { email: email } });
  if (!foundVendor) res.sendStatus(401); //unAuthorized

  const match = await bcrypt.compare(password, foundVendor.password);
  if (match) {
    const vendor = {
      id: foundVendor.id,
      username: foundVendor.username,
    };
    // create token
    const accesstoken = jwt.sign(vendor, ACCESS_TOKEN, { expiresIn: "40s" });
    const refreshtoken = jwt.sign(vendor, REFRESH_TOKEN, { expiresIn: "40m" });
    // setting refreshToken in httpOnly cookie
    res.cookie("jwt", refreshtoken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1000,
    });

    const cookie = req.cookies;
    if (!cookie?.jwt)
      return res.status(403).send("Could not save refresh Token");
    // saving refresh token for this client
    await Vendor.update(
      { refreshToken: refreshtoken },
      { where: { id: foundVendor.id } }
    );

    res.status(200).json({ accesstoken });
    // res.status(200).send(`Login ${foundAdmin.username} SUCESS`);
  } else {
    res.status(403).send("incorrect Password or username");
  }
};

export { handleClientLogin, handleAdminLogin, handleVendorLogin };
