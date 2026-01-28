const jwt = require("jsonwebtoken");

module.exports = (req, res, next)=>{
   const header = req.headers.authorization;
   let token = null;

   if(header){
    token = header.split(" ")[1];
   }

   if(!token && req.query.token) {
     token = req.query.token;
   }

   if(!token){
     return res.status(400).json({message : "Token is not provided."});
   }

   try{
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
   }
   catch{
     res.status(400).json({message: "Invalid Token"});
   }
};