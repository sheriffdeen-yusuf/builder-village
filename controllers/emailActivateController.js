import db from "../models/index.js";
import jwt from "jsonwebtoken";

const Client = db.clients;
const Admin = db.admins;
const Vendor = db.vendors;

const clientAccountActivation = async (req, res) => {
  const { activatetoken } = req.body;
  if (!activatetoken)
    return res.status(400).send("Please Provide your Activation Token");

  jwt.verify(
    activatetoken,
    process.env.ACCOUNT_ACTIVATION_TOKEN,
    async (err, decoded) => {
      if (err) return res.status(400).send("Incorrect or expired Link");
      const client = await Client.findOne({ where: { email: decoded.email } });
      if (client) {
        await Client.update(
          { verify: true },
          { where: { email: decoded.email } }
        );
        return res
          .status(200)
          .send(
            `${decoded.username} Your account is now Activated, Enjoy full services`
          );
      } else return res.status(401).send("Something went wrong, Try later!");
    }
  );
};

const adminAccountActivation = async (req, res) => {
  const { activatetoken } = req.body;
  if (!activatetoken)
    return res.status(400).send("Please Provide your Activation Token");

  jwt.verify(
    activatetoken,
    process.env.ACCOUNT_ACTIVATION_TOKEN,
    async (err, decoded) => {
      if (err) return res.status(400).send("Incorrect or expired Link");
      const admin = await Admin.findOne({ where: { email: decoded.email } });
      if (admin) {
        await Admin.update(
          { verify: true },
          { where: { email: decoded.email } }
        );
        return res
          .status(200)
          .send(`${decoded.username} Your account is now Activated`);
      } else return res.status(401).send("Something went wrong, Try later!");
    }
  );
};

const vendorAccountActivation = async (req, res) => {
  const { activatetoken } = req.body;
  if (!activatetoken)
    return res.status(400).send("Please Provide your Activation Token");

  jwt.verify(
    activatetoken,
    process.env.ACCOUNT_ACTIVATION_TOKEN,
    async (err, decoded) => {
      if (err) return res.status(400).send("Incorrect or expired Link");
      const vendor = await Vendor.findOne({ where: { email: decoded.email } });
      if (vendor) {
        await Vendor.update(
          { verify: true },
          { where: { email: decoded.email } }
        );
        return res
          .status(200)
          .send(`${decoded.username} Your account is now Activated`);
      } else return res.status(401).send("Something went wrong, Try later!");
    }
  );
};

export {
  clientAccountActivation,
  adminAccountActivation,
  vendorAccountActivation,
};
