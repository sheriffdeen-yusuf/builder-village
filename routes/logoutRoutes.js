import {
  handleClientLogout,
  handleAminLogout,
} from "../controllers/logoutController.js";

import express from "express";

const router = express.Router();

router.get("/client", handleClientLogout);
router.get("/admin", handleAminLogout);

export default router;
