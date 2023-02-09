import db from "../models/index.js";
import path from "path";
import multer from "multer";
import bcrypt from "bcrypt";
import Mailjet from "node-mailjet";
import jwt from "jsonwebtoken";
import emailService from "../services/emailService.js";

const Client = db.clients;

// Add/ signup clients
const add_client = async (req, res) => {
  let info = {
    username: req.body.username,
    email: req.body.email,
    gender: req.body.gender,
    // image: req.file.fieldname, // temp remove for deployment purpose
    password: req.body.password,
  };

  const duplicate = await Client.findOne({ where: { email: info.email } });
  if (duplicate) res.sendStatus(409); //confilct

  const hashedPassword = await bcrypt.hash(info.password, 10);
  info.password = hashedPassword;

  const payload = {
    username: info.username,
    email: info.email,
  };

  const activatetoken = jwt.sign(
    payload,
    process.env.ACCOUNT_ACTIVATION_TOKEN,
    {
      expiresIn: "20m",
    }
  );

  // sending mail to user
  emailService(activatetoken, info.username);

  const client = await Client.create(info);
  res.status(200).json({
    message: "SignUp Success, Check your email to acctivate your account!",
    // image: `http://localhost:8080/profile/${req.file.filename}`,
  });
};

const get_all_client = async (req, res) => {
  const clients = await Client.findAll({});
  res.status(200).send(clients);
};

const get_single_client = async (req, res) => {
  let req_id = req.params.id;
  const client = await Client.findOne({ where: { id: req_id } });
  res.status(200).send(client);
};

const update_client = async (req, res) => {
  let req_id = req.params.id;
  const client = await Client.update(req.body, { where: { id: req_id } });
  res.status(200).send(client);
};

const delete_client = async (req, res) => {
  let req_id = req.params.id;
  await Client.destroy({ where: { id: req_id } });
  res.status(200).send("client deleted successfully");
};

// Uploading Image

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/client");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
  limits: "2000000",
  fileFilter: (req, file, cb) => {
    const fileType = /jpeg|jpg|png|gif/;
    const mimeType = fileType.test(file.mimetype);
    const extName = fileType.test(path.extname(file.originalname));

    if (mimeType && extName) return cb(null, true);
    cb("Please provide proper file type");
  },
}).single("profile");

export {
  add_client,
  get_all_client,
  delete_client,
  update_client,
  get_single_client,
  upload,
};
