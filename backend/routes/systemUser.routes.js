import express from "express";

import { fetchAllSystemUsers } from "../controllers/systemUsers.controllers.js";

const router = express.Router();

router.route("/").get(fetchAllSystemUsers);


export default router;
