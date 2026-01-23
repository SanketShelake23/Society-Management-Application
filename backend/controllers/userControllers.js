const User = require("../models/User");
const bcrypt = require("bcryptjs");

const createSocietyAdmin = async(req,res)=>{
    try{
        const {name, email, password, society_id} = req.body;
        const hashed = await bcrypt.hash(password, 10);
        const admin = await User.create({
            name,
            email,
            password : hashed,
            role : "SOCIETY_ADMIN",
            society_id
        });
        res.status(200).json(admin);
    }
    catch(err){
        res.status(500).json({message : err.message});
    }

};

const createResident = async(req,res)=>{
   try{
    const {name, email, password} = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const resident = await User.create({
        name,
        email,
        password : hashed,
        role: "RESIDENT",
        society_id : req.user.society_id
    });
     res.status(200).json(resident);

   }
   catch(err){
     res.status(500).json({message : err.message});
   }
};

const createGuard = async(req,res)=>{
    try{
       const {name, email, password} = req.body;
       const hashed = await bcrypt.hash(password, 10);
       const guard = await User.create({
         name,
         email,
         password : hashed,
         role : "GUARD",
         society_id : req.user.society_id
       });
       
       res.status(200).json(guard);

    }
    catch(err){
        res.status(500).json({message : err.message});
    }
};


module.exports = {createSocietyAdmin, createResident, createGuard};