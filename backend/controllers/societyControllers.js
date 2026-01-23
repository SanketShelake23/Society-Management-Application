const Society = require("../models/Society");

const createSociety = async(req,res)=>{
    try{
    const society = await Society.create(req.body);
    res.status(200).json(society);
    }
    catch(err){
        res.status(500).json({message : err.message});
    }
};

const getAllSociety = async(req,res)=>{
    try{
        const socities = await Society.findAll();
        res.json(socities);
    }
    catch(err){
        res.status(500).json({message : err.message});
    }
};

module.exports = {createSociety, getAllSociety};