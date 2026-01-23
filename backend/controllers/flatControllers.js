const Flat = require("../models/Flat");

const createFlat = async(req, res)=>{
   const flat = await Flat.create(req.body);
   res.status(200).json(flat);
}

const getFlatsByBlock = async(req,res)=>{
    const flats = await Flat.findAll({
        where : {block_id : req.params.blockId}
    });
    res.json(flats);
};

const assignResident = async(req,res)=>{
   const {flatId} = req.params;
   const {resident_id} = req.body;

   await Flat.update(
     {resident_id},
     {where : {id : flatId}}
   );

   res.json("Resident is Assigned to the Flat Successfully.");
};

module.exports = {createFlat, getFlatsByBlock, assignResident};