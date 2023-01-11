import db from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN_SECRET;

const Client = db.clients;

const handleClientLogin = async (req, res) => {
  const { password, email } = req.body;
  // check if client exist
  const foundClient = await Client.findOne({ where: { email: email } });
  if (!foundClient) res.sendStatus(401); //unAuthorized

  const match = await bcrypt.compare(password, foundClient.password);
  if (match) {
    const client = {
      id: foundClient.id,
      username: foundClient.username,
    };

    // create token
    const accesstoken = jwt.sign(client, ACCESS_TOKEN, { expiresIn: "40s" });
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

    res.status(200).json({ accesstoken });
    // res.status(200).send(`Login ${foundClient.username} SUCESS`);
  } else {
    res.status(403).send("incorrect Password or user");
  }
};

export { handleClientLogin };
