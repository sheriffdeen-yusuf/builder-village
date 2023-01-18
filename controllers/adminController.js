import db from "../models/index.js";
import path from "path";
import multer from "multer";
import bcrypt from "bcrypt";

const Admin = db.admins;

// Add Admin

const add_admin = async (req, res) => {
  let info = {
    username: req.body.username,
    email: req.body.email,
    image: req.file.fieldname,
    password: req.body.password,
  };

  const duplicate = await Admin.findOne({ where: { email: info.email } });
  if (duplicate) res.sendStatus(409); //confilct

  const hashedPassword = await bcrypt.hash(info.password, 10);
  info.password = hashedPassword;

  // Generating activation token for this user
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

  const admin = await Admin.create(info);
  res.status(200).json({
    message: "SignUp Success, Check your email to acctivate your account!",
    image: `http://localhost:8080/admin/profile/${req.file.filename}`,
  });
};

const get_all_admin = async (req, res) => {
  const admins = await Admin.findAll({});
  res.status(200).send(admins);
};

const get_single_admin = async (req, res) => {
  let req_id = req.params.id;
  const admin = await Admin.findOne({ where: { id: req_id } });
  res.status(200).send(admin);
};

const update_admin = async (req, res) => {
  let req_id = req.params.id;
  const admin = await Admin.update(req.body, { where: { id: req_id } });
  res.status(200).send(admin);
};

const delete_admin = async (req, res) => {
  let req_id = req.params.id;
  await Admin.destroy({ where: { id: req_id } });
  res.status(200).send("Admin deleted successfully");
};

// Uploading Image

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/admin");
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
}).single("adProfile");

export {
  add_admin,
  get_all_admin,
  delete_admin,
  update_admin,
  get_single_admin,
  upload,
};
