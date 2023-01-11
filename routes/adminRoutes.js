import {
  add_admin,
  get_all_admin,
  delete_admin,
  update_admin,
  get_single_admin,
  upload,
} from "../controllers/adminController.js";

import express from "express";

const router = express.Router();

router.post("/addAdmin", upload, add_admin);
router.get("/getAdmins", get_all_admin);
router.get("/:id", get_single_admin);
router.put("/:id", update_admin);
router.delete("/:id", delete_admin);

export default router;
