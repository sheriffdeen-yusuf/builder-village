import { clientAccountActivation } from "../controllers/emailActivateController.js";
import express from "express";

const router = express.Router();

router.post("/client", clientAccountActivation);

export default router;
