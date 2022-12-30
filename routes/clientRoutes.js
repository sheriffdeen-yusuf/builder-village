import {
  add_client,
  get_all_client,
  delete_client,
  update_client,
  get_single_client,
} from "../controllers/clientControllers.js";

import express from "express";

const router = express.Router();

router.post("/addClient", add_client);
router.get("/getClients", get_all_client);
router.get("/:id", get_single_client);
router.put("/:id", update_client);
router.delete("/:id", delete_client);

export default router;
