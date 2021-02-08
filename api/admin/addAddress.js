const express = require("express");
const router = express.Router();

const pool = require("../../config/db");

const authorize = require("../../config/authorize");

router.post("/address",authorize, async (req, res) => {

  try {

    const 
    {
      full_name,
      pincode,
      building_name,
      area,
      landmark,
      city,
      state,
      country,
      ph_no
    } = req.body;

    const user = await pool.query
    (
      "SELECT * FROM address WHERE ph_no = $1", 
      [ph_no]
    );

    if (user.rows.length !== 0) 
    {
      return res.status(401).send("Address already exist");
    }

    const address = await pool.query
    (

      "INSERT INTO address(full_name,pincode,building_name,area,landmark,city,state,country,ph_no) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",

      [
        full_name,
        pincode,
        building_name,
        area,
        landmark,
        city,
        state,
        country,
        ph_no
      ]

    );
  } 
  catch (err) 
  {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
