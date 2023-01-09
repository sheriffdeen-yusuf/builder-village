import { handleClientLogin } from "../controllers/authController.js";
import express from "express";

const router = express.Router();

router.post("/login", handleClientLogin);

export default router;
