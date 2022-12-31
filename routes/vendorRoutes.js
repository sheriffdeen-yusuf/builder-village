import {
  get_all_vendor,
  get_single_Vendor,
  add_vendor,
  update_vendor,
  delete_vendor,
  get_coperate_account,
  get_personal_account,
  addLogin,
} from "../controllers/vendorControllers.js";

import { Router } from "express";

const router = Router();

// prototype admin login
router.post("/login", addLogin);

router.post("/addVendor", add_vendor);

router.get("/getVendors", get_all_vendor);

router.get("/coporate", get_coperate_account);

router.get("/personal", get_personal_account);

router.get("/:id", get_single_Vendor);

router.put("/:id", update_vendor);

router.delete("/:id", delete_vendor);

export default router;
