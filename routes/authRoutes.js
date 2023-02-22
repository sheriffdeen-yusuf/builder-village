import {
  handleClientLogin,
  handleAdminLogin,
  handleVendorLogin,
} from "../controllers/authController.js";

import { client_forgetPassword } from "../controllers/forgetPasswordController.js";

import express from "express";
import { client_resetPassword } from "../controllers/resetPasswordController.js";

const router = express.Router();

router.post("/client", handleClientLogin);
router.post("/admin", handleAdminLogin);
router.post("/vendor", handleVendorLogin);

// Handling forget password

router.put("/client", client_forgetPassword);
router.post("/reset", client_resetPassword);

export default router;
