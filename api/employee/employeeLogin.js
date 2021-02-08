const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");

const pool = require("../../config/db");

const authorize = require("../../config/authorize"); 
const jwtGenerator = require("../../config/jwtGenerator");

router.post("/login",async (req, res) => 
 {

  try  
  {
      const 
      { 
          email, 
          password 
      } = req.body;

      const user = await pool.query
      (
          "SELECT * FROM employee_info WHERE email =$1", 
          [email]
      );

      console.log(user.rows[0].role);
   
      if ((user.rows.length === 0) || (user.rows[0].role != "employee") ) 
      {
          return res.status(401).send("Invalid user");
      }

      const validPassword = await bcrypt.compare(password, user.rows[0].user_password);
     
      if (!validPassword) 
      {
          return res.status(401).json("Invalid Credential");
      }

      const token = jwtGenerator(user.rows[0].emp_id);
      return +res.json({ token });

  } 
  catch (err) 
  {
      console.error(err.message);
      res.status(500).send("Server Error");
  }

});
module.exports = router;
