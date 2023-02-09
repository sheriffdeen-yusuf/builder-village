import {
  add_client,
  get_all_client,
  delete_client,
  update_client,
  get_single_client,
  upload,
} from "../controllers/clientControllers.js";
import { verifyjwt } from "../middleware/verifyJWT.js";

import express from "express";

const router = express.Router();

// router.post("/addClient", upload, add_client);  // Signup is unprotected route, normal
router.post("/addClient", add_client); // testing cloud server
router.get("/getClients", verifyjwt, get_all_client);
router.get("/:id", verifyjwt, get_single_client);
router.put("/:id", verifyjwt, update_client);
router.delete("/:id", verifyjwt, delete_client);

export default router;
