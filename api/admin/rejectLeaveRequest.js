const express = require("express");
const router = express.Router();

const pool = require("../../config/db");

const authorize = require("../../config/authorize");

router.put("/rejectLeaveRequest/:id",authorize, async (req, res) => {
  try {

    
    const results = await pool.query(
      "UPDATE leave_request SET status = 'f' WHERE leave_id = $1 returning *",
      [ req.params.id]
    );

    res.json("leave rejected");
  } catch (err) {
    console.log(err);
  }
  console.log(req.params.id);
 
});
module.exports = router;

 