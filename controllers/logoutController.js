import db from "../models/index.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN_SECRET;

const Client = db.clients;
const Admin = db.admins;

// 1. Handle clinet logout
const handleClientLogout = (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) return res.status(204).send("No cookie found"); //No cookies, No response anywasy

  const refreshtoken = cookie.jwt;

  jwt.verify(refreshtoken, REFRESH_TOKEN, async (err, decoded) => {
    const foundClient = await Client.findOne({
      where: {
        id: decoded.id,
      },
    });

    if (!foundClient) {
      // if cookie did exist but no user founf=d for it, clear anyways
      res.clearCookie("jwt", { httpOnly: true });
      res.sendStatus(204);
    }

    // Otherwise since their a client for it, delete from d=DB then clear cookie
    await Client.update(
      { refreshToken: null },
      { where: { id: foundClient.id } }
    );
    res.clearCookie("jwt", {
      httpOnly: true, // secure: true -> only severs on https for production
    });

    res.status(200).send("You are logout");
  });
};

// 2. Handle Admin Logout
const handleAminLogout = (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) return res.status(204).send("No cookie found"); //No cookies, No response anywasy

  const refreshtoken = cookie.jwt;

  jwt.verify(refreshtoken, REFRESH_TOKEN, async (err, decoded) => {
    const foundAdmin = await Admin.findOne({
      where: {
        id: decoded.id,
      },
    });

    if (!foundAdmin) {
      // if cookie did exist but no user founf=d for it, clear anyways
      res.clearCookie("jwt", { httpOnly: true });
      res.sendStatus(204);
    }

    // Otherwise since their a client for it, delete from d=DB then clear cookie
    await Client.update(
      { refreshToken: null },
      { where: { id: foundAdmin.id } }
    );
    res.clearCookie("jwt", {
      httpOnly: true, // secure: true -> only severs on https for production
    });

    res.status(200).send("You are logout");
  });
};

export { handleClientLogout, handleAminLogout };
