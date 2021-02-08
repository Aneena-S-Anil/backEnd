const express = require("express");
const router = express.Router();
const pool = require("../../config/db");

const authorize = require("../../config/authorize");

router.delete("/leaveRequest/:id", async (req, res) => {
    try {
      const results = pool.query("DELETE FROM leave_request where leave_id = $1", [
        req.params.id
      ]);
      res.json("leave canceled!");
    } catch (err) {
      console.log(err);
    }
  });
module.exports = router;