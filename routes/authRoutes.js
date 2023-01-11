import { handleClientLogin } from "../controllers/authController.js";
import { handleAdminLogin } from "../controllers/authController.js";
import express from "express";

const router = express.Router();

router.post("/client", handleClientLogin);
router.post("/admin", handleAdminLogin);

export default router;
