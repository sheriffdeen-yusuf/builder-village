import db from "../models/index.js";
import jwt from "jsonwebtoken";

const Admin = db.adminLogin;

// task 1
const loginAdmin = (req, res) => {
  const admin = { name: "admin", email: "admin@gmail.com" };
  // Generating token for this admin
  jwt.sign(admin, "secretkey", { expiresIn: "2m" }, (err, token) => {
    if (err) res.send(err);
    res.status(200).json({
      token,
      admin,
    });
  });
};

// task 2
const getAdmin = async (req, res) => {
  let req_id = req.params.id;
  const adminData = await Admin.findOne({ where: { id: req_id } });
  res.send(admin);
};

export { getAdmin, loginAdmin };
