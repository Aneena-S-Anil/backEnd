const express = require("express");
const router = express.Router();

const pool = require("../../config/db");
const authorize = require("../../config/authorize");

router.post("/leaveRequest", authorize, async (req, res) => 
 {
  try 
  {
    
    const 
    {
    leave_id,
    requested_on,
    leave_type,
    from_date,
    to_date,
    description,
    status
    } = req.body;

    const user = await pool.query
    (
      "SELECT * FROM leave_request WHERE from_date= $1", 
     [from_date]
    );

    if (user.rows.length !== 0) 
    {
      return res.status(401).send("Already exist");
    }

    const leave = await pool.query
    (
      "INSERT INTO leave_request(requested_on,leave_type,from_date,to_date,description,status) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
      [requested_on, leave_type, from_date, to_date, description, status]
    );

  } 
  catch (err) 
  {
    console.error(err.message);
    res.status(500).send("Server error");
  }

 }
);
module.exports = router;
