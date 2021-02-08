const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const pool = require("../../config/db");

const valid = require("../../config/valid");

const jwtGenerator = require("../../config/jwtGenerator");


router.post("/employee",valid,async (req, res) => {

  try 
  {

    const 
    {
      role,
      email,
      first_name,
      last_name,
      gender,
      dob,
      age,
      blood_group,
      marital_status,
      guardian_name,
      ph_no,
      user_status,
      user_password

    } = req.body;

    const user = await pool.query
    (
      "SELECT * FROM employee_info WHERE email= $1", 
      [email]
    );

    if (user.rows.length !== 0) 
    {
      return res.status(401).send("User already exist");
    }

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(user_password, salt);

    const newUser = await pool.query
    (
      "INSERT INTO employee_info( role,email,first_name,last_name,gender,dob,age,blood_group,marital_status,guardian_name,ph_no,user_status,user_password) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *",
      [
        role,
        email,
        first_name,
        last_name,
        gender,
        dob,
        age,
        blood_group,
        marital_status,
        guardian_name,
        ph_no,
        user_status,
        bcryptPassword,
      ]
    );
  } 

catch (err) 
  {

    console.error(err.message);
    res.status(500).send("Server Error");

  }

});

module.exports = router;
