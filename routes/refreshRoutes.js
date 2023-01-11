import { clientRefreshToken } from "../controllers/refreshController.js";
import express from "express";

const router = express.Router();

router.get("/client", clientRefreshToken);

export default router;
