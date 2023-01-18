import {
  clientAccountActivation,
  adminAccountActivation,
  vendorAccountActivation,
} from "../controllers/emailActivateController.js";
import express from "express";

const router = express.Router();

router.post("/client", clientAccountActivation);
router.post("/vendor", vendorAccountActivation);
router.post("/admin", adminAccountActivation);

export default router;
