import { pool } from "../db/connect.js";

export const addCandidateToPosition = async (req, res, next) => {
  const { firstName, middleName, lastName, emailAddress, positionID } =
    req.body;
  console.log("THE BODY", req.body);
  let sql =
    "INSERT INTO position_candidate (position_id, first_name, middle_name, last_name, email_address, is_hired) VALUES (?, ?, ?, ?, ?, ?)";
  try {
    await pool.query(sql, [
      positionID,
      firstName,
      middleName,
      lastName,
      emailAddress,
      false,
    ]);

    return res
      .status(201)
      .json({ message: "position candidate has been created" });
  } catch (error) {
    console.log("THE ERROR", error);
    next(error);
  }
};

// export const fetchAllPositionCandidates = async (req, res, next) => {
//   // const { candidateName } = req.body;

//   let sql = "SELECT * FROM position_candidate";

//   const [positionCandidate] = await pool.query(sql);

//   return res.status(201).json(positionCandidate);
// };

export const fetchAllPositionCandidates = async (req, res, next) => {
  const { positionID } = req.params;
  let sql =
    "SELECT " +
    "id, " +
    "first_name AS firstName, " +
    "middle_name AS middleName, " +
    "last_name AS lastName, " +
    "email_address AS emailAddress, " +
    "is_hired AS isHired " +
    "FROM position_candidate WHERE position_id = ? ORDER BY is_hired ASC";
  let sql2 = "SELECT * FROM positions WHERE position_id = ?";

  try {
    const [positionCandidates] = await pool.query(sql, [positionID]);
    const [position] = await pool.query(sql2, [positionID]);
    const response = {
      position: {
        positionID: position[0].position_id,
        positionName: position[0].position_name,
      },
      positionCandidates,
    };

    console.log("THE RESPONSE", response);
    return res.status(201).json(response);
  } catch (error) {
    next(error);
  }
  // const { candidateName } = req.body;
};
export const hireCandidate = async (req, res, next) => {
  const { id } = req.params;
  let sql = "UPDATE position_candidate SET is_hired = ? WHERE id = ?";
  let sql2 = "SELECT * FROM position_candidate WHERE id = ?";
  let sql3 =
    "INSERT INTO system_users (position_id, first_name, middle_name, last_name, email_address) VALUES (?, ?, ?, ?, ? )";

  try {
    await pool.query(sql, [true, id]);
    const [candidate] = await pool.query(sql2, [id]);


    const {
      position_id: positionID,
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      email_address: emailAddress,
    } = candidate[0];
    
    await pool.query(sql3, [
      positionID,
      firstName,
      middleName,
      lastName,
      emailAddress,
    ]);

    return res
      .status(201)
      .json({ message: "You have successfully hired the candidate. See the list of your system users" });
  } catch (error) {
    console.log("THE ERROR", error);
    next(error);
  }
  // const { candidateName } = req.body;
};
