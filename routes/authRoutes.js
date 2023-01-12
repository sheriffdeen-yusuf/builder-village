import {
  handleClientLogin,
  handleAdminLogin,
  handleVendorLogin,
} from "../controllers/authController.js";
import express from "express";

const router = express.Router();

router.post("/client", handleClientLogin);
router.post("/admin", handleAdminLogin);
router.post("/vendor", handleVendorLogin);

export default router;
