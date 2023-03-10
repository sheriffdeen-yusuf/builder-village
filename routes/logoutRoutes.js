import {
  handleClientLogout,
  handleAminLogout,
  handleVendorLogout,
} from "../controllers/logoutController.js";

import express from "express";

const router = express.Router();

router.get("/client", handleClientLogout);
router.get("/admin", handleAminLogout);
router.get("/vendor", handleVendorLogout);

export default router;
