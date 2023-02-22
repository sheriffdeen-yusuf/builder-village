import db from "../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const Client = db.clients;

const client_resetPassword = async (req, res) => {
  const { restlink, newpass } = req.body;
  const hashedPassword = await bcrypt.hash(newpass, 10);
  if (restlink !== " ") {
    jwt.verify(
      restlink,
      process.env.RESET_PASSWORD_KEY,
      async (err, decoded) => {
        if (err) return res.status(400).send("Incorrect or expired Link");
        const client = await Client.findOne({
          where: { resetLink: req.body.restlink },
        });
        if (client) {
          await Client.update(
            { password: hashedPassword, resetLink: " " },
            { where: { id: decoded.id } }
          );
          return res.status(200).send(`Your Password is successfully updated!`);
        } else
          return res
            .status(401)
            .send("User with this reset token does not exist!");
      }
    );
  } else {
    return res.status(401).send("Token or newPassword can not be empty!");
  }
};

export { client_resetPassword };
