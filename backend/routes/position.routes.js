import express from "express";
import {
  createPosition,
  fetchAllPositions,
} from "../controllers/positions.controllers.js";

const router = express.Router();

router.route("/").post(createPosition).get(fetchAllPositions);

export default router;
