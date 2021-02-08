const express = require("express");
const router = express.Router();

const pool = require("../../config/db");

const authorize = require("../../config/authorize");

const bcrypt = require("bcrypt");

router.put("/employee/:id",async (req, res) => {

    try 
    {
  
      const newUser = await pool.query
      (
        "UPDATE employee_info SET marital_status = $1 RETURNING *",
        [ 
          
          req.body.marital_status,
          
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