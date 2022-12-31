import db from "../models/index.js";
import jwt from "jsonwebtoken";

const Vendor = db.vendors;

// this is a prototype Admin login
const addLogin = (req, res) => {
  const admin = { name: "admin", email: "admin@gmail.com" };
  jwt.sign(admin, "secretkey", { expiresIn: "2m" }, (err, token) => {
    if (err) return res.send(err);
    res.status(200).send(token);
  });
};

const get_all_vendor = async (req, res) => {
  const vendors = await Vendor.findAll({});
  res.status(200).send(vendors);
};

const get_single_Vendor = async (req, res) => {
  let req_id = req.params.id;
  const vendor = await Vendor.findOne({ where: { id: req_id } });
  res.status(200).send(vendor);
};

const add_vendor = async (req, res) => {
  let info = {
    username: req.body.username,
    accountType: req.body.accountType,
    fullname: req.body.fullname,
    company_name: req.body.company,
    email: req.body.email,
    nin: req.body.nin,
    phone: req.body.phone,
    state: req.body.state,
    lga: req.body.lga,
  };

  const vendor = await Vendor.create(info);

  res.status(200).send(vendor);
};

const update_vendor = async (req, res) => {
  let req_id = req.params.id;

  const vendor = await Vendor.update(req.body, { where: { id: req_id } });
  res.status(200).send(vendor);
};

const delete_vendor = async (req, res) => {
  let req_id = req.params.id;

  await Vendor.destroy({ where: { id: req_id } });
  res.status(200).send("Vendor deleted");
};

const get_personal_account = async (req, res) => {
  const vendors = await Vendor.findAll({ where: { account_type: "personal" } });
  res.status(200).send(vendors);
};

const get_coperate_account = async (req, res) => {
  const vendors = await Vendor.findAll({ where: { account_type: "coporate" } });
  res.status(200).send(vendors);
};

export {
  get_all_vendor,
  get_single_Vendor,
  add_vendor,
  update_vendor,
  delete_vendor,
  get_coperate_account,
  get_personal_account,
  addLogin,
};
