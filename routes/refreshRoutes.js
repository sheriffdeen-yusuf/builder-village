import {
  clientRefreshToken,
  adminRefreshToken,
  vendorRefreshToken,
} from "../controllers/refreshController.js";

import express from "express";

const router = express.Router();

router.get("/client", clientRefreshToken);
router.get("/admin", adminRefreshToken);
router.get("/vendor", vendorRefreshToken);

export default router;
