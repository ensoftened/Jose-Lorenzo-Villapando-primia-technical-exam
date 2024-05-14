import { pool } from "../db/connect.js";

export const createCandidate = async (req, res, next) => {
  const { candidateName } = req.body;

  let sql = "INSERT INTO candidates (candidate_name) VALUES (?)";

  await pool.query(sql, [candidateName]);

  return res.status(201).json({ message: "candidate has been created" });
};

export const fetchAllCandidates = async (req, res, next) => {
  // const { candidateName } = req.body;

  let sql = "SELECT * FROM candidates";

  const [candidates] = await pool.query(sql);

  return res.status(201).json(candidates);
};
