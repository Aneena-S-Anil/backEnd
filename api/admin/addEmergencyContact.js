const express = require("express");
const router = express.Router();

const pool = require("../../config/db");

const authorize = require("../../config/authorize");


router.post("/emergencyContact",authorize, async (req, res) => 
{
  
  try 
  {
    const 
    {
      full_name, 
      address, 
      relation, 
      ph_no 
    } = req.body;

    const user = await pool.query
    (
      "SELECT * FROM emergency_contact WHERE ph_no= $1",
      [ph_no]
    );

    if (user.rows.length !== 0) 
    {
      return res.status(401).send("contact already exist");
    }

    const contact = await pool.query
    (
      "INSERT INTO emergency_contact(full_name,address,relation,ph_no) VALUES($1,$2,$3,$4) RETURNING *",
      [full_name, address, relation, ph_no]
    );

  } 
  
  catch (err) 
  {
    console.error(err.message);
    res.status(500).send("Server error");
  }

});

module.exports = router;
