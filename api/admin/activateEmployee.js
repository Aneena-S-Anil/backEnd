const express = require("express");
const router = express.Router();

const pool = require("../../config/db");

const authorize = require("../../config/authorize");



// router.get("/:id", authorize,async (req, res) => 
//  {

//     const { id} = req.params;

//     try 
//     {
//       const activate = await db.query 
//       (
//         "UPDATE employee_info SET user_status = 't' WHERE emp_id = $1 ",
//         [id]
//       );

//       res.json({ message: `User ${id} has been activated` });

//     } 

//     catch(err) 
//     {
//       res.status(422).send('User cannot be activated!');
//     }

//  }
// )

router.put("/:id",authorize, async (req, res) => {
  try {
    
    const results = await pool.query(
      "UPDATE employee_info SET user_status = 't' WHERE emp_id = $1 returning *",
      [ req.params.id]
    );

    res.json("user activated");
  } catch (err) {
    console.log(err);
  }
  console.log(req.params.id);
  console.log(req.body);
});
module.exports = router;
