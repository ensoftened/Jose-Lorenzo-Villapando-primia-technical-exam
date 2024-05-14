import { pool } from "../db/connect.js";

export const createPosition = async (req, res, next) => {
  const { positionName } = req.body;

  let sql = "INSERT INTO positions (position_name) VALUES (?)";
  console.log("SQL", positionName);

  try {
    await pool.query(sql, [positionName]);

    return res.status(201).json({ message: "position has been created" });
  } catch (error) {
    console.log("NAG ERROR");
    next(error);
  }
};

export const fetchAllPositions = async (req, res, next) => {
  // const { positionName } = req.body;

  let sql = "SELECT * FROM positions";

  try {
    const [positions] = await pool.query(sql);
    return res.status(201).json(positions);
  } catch (error) {
    next(error);
  }
};
