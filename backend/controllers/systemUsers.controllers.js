import { pool } from "../db/connect.js";

export const fetchAllSystemUsers = async (req, res, next) => {


  let sql = "SELECT " + 
  "id, " +
  "positions.position_name AS positionName, " +
  "system_users.first_name AS firstName, " +
  "system_users.middle_name AS middleName, " +
  "system_users.last_name AS lastName, " +
  "system_users.email_address AS emailAddress, " +
  "system_users.date_hired AS dateHired " +
  " FROM system_users INNER JOIN positions ON system_users.position_id = positions.position_id";

  try {
    const [systemUsers] = await pool.query(sql);
    return res.status(201).json(systemUsers);
  } catch (error) {
    next(error);
  }
};
