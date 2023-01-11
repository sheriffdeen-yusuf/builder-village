import { handleClientLogout } from "../controllers/logoutController.js";

import express from "express";

const router = express.Router();

router.get("/client", handleClientLogout);

export default router;
