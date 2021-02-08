const express = require("express");
const router = express.Router();

const pool = require("../../config/db");

const authorize = require("../../config/authorize");


router.post("/resetPassword", authorize, async(req, res) => 
 {
    try 
    {
       

    } 
    catch (err) 
    {
      console.error(err.message);
      res.status(500).send("Server error");
    }
 }
); 
  module.exports = router;
