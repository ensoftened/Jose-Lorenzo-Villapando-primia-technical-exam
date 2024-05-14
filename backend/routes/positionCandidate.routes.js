import express from "express";
import {
  addCandidateToPosition,
  fetchAllPositionCandidates,
  hireCandidate,
} from "../controllers/positionCandidate.controllers.js";

const router = express.Router();

router.route("/").post(addCandidateToPosition);
router
  .route("/fetch-all-position-candidates/:positionID")
  .get(fetchAllPositionCandidates);
  
router.route("/hire-candidate/:id").put(hireCandidate);

export default router;
