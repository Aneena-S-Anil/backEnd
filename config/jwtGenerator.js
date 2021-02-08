require('dotenv').config();

const jwt = require("jsonwebtoken");

function jwtGenerator(emp_id) 
{

    const payload = 
    {
        user: emp_id
    }

    return jwt.sign
        (
            payload, process.env.jwtSecret,
            { expiresIn: "48hr" }
        )
}

module.exports = jwtGenerator; 