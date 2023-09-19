import { Router } from "express";
import { getAllCancelled } from "../controllers/cancelledController.js";

const router = Router();

router.route("/").get(getAllCancelled);

export default router;
