const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async(req, res)=>{
    try{
    const {email, password} = req.body;

    const user = await User.findOne({where : {email}});

    if(!user) return res.status(400).json({message : "User not found"});
    if(user.status !== "ACTIVE") return res.status(400).json({message : "Account is inactive."});

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({message : "Invalid Credentials."});


    const token = jwt.sign(
        {id : user.id, role : user.role, society_id : user.society_id},
        process.env.JWT_SECRET,
        {expiresIn : "1d"}
    );

    res.json({
        token,
        user : {
            id : user.id,
            name : user.name,
            role :  user.role
        }
    });

   }
   catch(err){
      res.status(500).json({error: err.message});
   }
};