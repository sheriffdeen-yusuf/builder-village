import db from "../models/index.js";
import sendForgetPasswordLink from "../services/sendForgetPasswordLink.js";
import jwt from "jsonwebtoken";

const Client = db.clients;

const client_forgetPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(403).send("email field can not be empty");

  const foundEmail = await Client.findOne({ where: { email: email } });
  if (!foundEmail)
    return res.status(400).send("User with this mail doesnt exist!");

  const payload = {
    id: foundEmail.id,
  };

  const password_reset_token = jwt.sign(
    payload,
    process.env.RESET_PASSWORD_KEY,
    {
      expiresIn: "20m",
    }
  );

  const reset_link = await Client.update(
    { resetLink: password_reset_token },
    {
      where: { email: email },
    }
  );
  if (reset_link == 0) {
    res
      .status(400)
      .send("Error occured while syncing reset token. please try again");
  } else {
    // sending mail to user
    sendForgetPasswordLink(
      password_reset_token,
      foundEmail.username,
      foundEmail.email
    );
    res.status(200).json({
      message: "A password reeset link has been sent to your mail",
      resetToken: password_reset_token,
    });
  }
};

const client_resetPassword = async (req, res) => {};

export { client_forgetPassword };
