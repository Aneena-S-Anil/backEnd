const express = require("express");
const router = require("express").Router();

const pool = require("../../config/db");

const authorize = require("../../config/authorize");


router.get("/myProfile", authorize, async (req, res) => 
 {
  try {
    
    const user = await pool.query
    (
      "SELECT (role,email,first_name,last_name,gender,dob,age,blood_group,marital_status,guardian_name,ph_no,user_status) FROM employee_info WHERE emp_id = $1 ",
      [req.user]
    );

    res.json(user.rows[0]);

  } 
  catch (err) 
  {
    console.error(err.message);
    res.status(500).send("Server error");
  }

 }
);

module.exports = router;