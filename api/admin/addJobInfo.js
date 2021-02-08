const express = require("express");
const router = express.Router();

const pool = require("../../config/db");

const authorize = require("../../config/authorize");

router.post("/jobInfo",authorize, async (req, res) => 
 {

  try 
  {

    const 
    { 
      doj, 
      account_no, 
      ifsc_code, 
      salary 
    } = req.body;

    const user = await pool.query
    (
      "SELECT * FROM job_info WHERE account_no= $1",
      [account_no]
    );

    if (user.rows.length !== 0) 
    {
      return res.status(401).send("Information already exist");
    }

    const info = await pool.query
    (
      "INSERT INTO job_info(doj,account_no,ifsc_code,salary) VALUES($1,$2,$3,$4) RETURNING *",
      [doj, account_no, ifsc_code, salary]
    );
  } 
  catch (err) 
  {
    console.error(err.message);
    res.status(500).send("Server error");
  }
  
});
module.exports = router;
