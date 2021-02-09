require("dotenv").config();

const express = require("express");
const app = express();

const pool = require("./config/db");
const cors = require("cors");

const port = process.env.PORT || 5001;


app.use(cors());
app.use(express.json());

// ADMIN ADD EMPLOYEE
app.use("/admin/add", require("./api/admin/addAddress"));
app.use("/admin/add", require("./api/admin/addJobInfo"));
app.use("/admin/add", require("./api/admin/addEmployee"));
app.use("/admin/add", require("./api/admin/addEmergencyContact"));

//ADMIN LOGIN
app.use("/admin", require("./api/admin/adminLogin"));

//ADMIN VIEW
app.use("/admin/view", require("./api/admin/employeeInfo"));
app.use("/admin/view", require("./api/admin/employeeList"));

// ADMIN MANAGE LEAVE REQUEST
app.use("/admin/manage", require("./api/admin/rejectLeaveRequest"));
app.use("/admin/manage", require("./api/admin/approveLeaveRequest"));

//ADMIN ACTIVATE EMPLOYEE
app.use("/admin/activate", require("./api/admin/activateEmployee"));

// ADMIN RESET PASSWORD
// app.use("/admin/reset", require("./api/admin/resetPassword"));

//EMPLOYEE MANAGE LEAVE REQUEST
app.use("/employee/add", require("./api/employee/addLeaveRequest"));
app.use("/employee/manage", require("./api/employee/modifyLeaveRequest"));

// EMPLOYEE LOGIN
app.use("/employee", require("./api/employee/employeeLogin"));

// EMPLOYEE VIEW
app.use("/employee/view", require("./api/employee/viewProfile"));

app.listen(port,() =>{
    console.log("Server running on " +port);
})