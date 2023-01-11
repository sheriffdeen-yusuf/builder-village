import {
  clientRefreshToken,
  adminRefreshToken,
} from "../controllers/refreshController.js";

import express from "express";

const router = express.Router();

router.get("/client", clientRefreshToken);
router.get("/admin", adminRefreshToken);

export default router;
