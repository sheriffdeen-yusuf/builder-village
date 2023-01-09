import db from "../models/index.js";
import bcrypt from "bcrypt";

const Client = db.clients;

const handleClientLogin = async (req, res) => {
  const { password, email } = req.body;
  // check if client exist
  const found = await Client.findOne({ where: { email: email } });
  if (!found) res.sendStatus(401); //unAuthorized

  const match = await bcrypt.compare(password, found.password);
  if (match) {
    res.status(200).send(`Login ${found.username} SUCESS`);
  } else {
    res.status(403).send("incorrect Password");
  }
};

export { handleClientLogin };
