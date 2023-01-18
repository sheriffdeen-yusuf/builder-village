import db from "../models/index.js";
import path from "path";
import multer from "multer";
import bcrypt from "bcrypt";

const Vendor = db.vendors;

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
    image: req.file.fieldname,
    password: req.body.password,
  };

  const duplicate = await Vendor.findOne({ where: { email: info.email } });
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

  const vendor = await Vendor.create(info);
  res.status(200).json({
    message: "SignUp Success, Check your email to acctivate your account!",
    image: `http://localhost:8080/vendor/profile/${req.file.filename}`,
  });
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

// Uploading Image

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/vendor");
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
}).single("vdProfile");

export {
  get_all_vendor,
  get_single_Vendor,
  add_vendor,
  update_vendor,
  delete_vendor,
  get_coperate_account,
  get_personal_account,
  upload,
};
