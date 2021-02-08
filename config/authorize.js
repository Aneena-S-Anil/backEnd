require("dotenv").config();

const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) 
{
 
  const token = req.header("token");

  if (!token) 
  {
    return res.status(403).json({ msg: "access denied" });

  }

  try 
  {
    const payload = jwt.verify(token, process.env.jwtSecret);
    req.user = payload.user;
    next();
  } 
  catch (err) 
  {
    res.status(401).json({ msg: "Token is not valid" });
  }
  
};