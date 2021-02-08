const router = require("express").Router();

const pool = require("../../config/db");

const authorize = require("../../config/authorize");

router.get("/employeeInfo/:id", async (req, res) => {
  console.log(req.params.id);

  try {
    const user = await pool.query(
      "SELECT (role,email,first_name,last_name,gender,dob,age,blood_group,marital_status,guardian_name,ph_no,user_status) FROM employee_info WHERE emp_id = $1 ",
      [req.params.id]
    );
    console.log(user);

    res.status(200).json({
      status: "success",
      data: {
        user: user.rows[0],
      
      },
    });
  } catch (err) {
    console.log(err);
  }
});


module.exports = router;