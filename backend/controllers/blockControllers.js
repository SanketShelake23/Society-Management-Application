const Block = require("../models/Block");

const createBlock = async(req, res)=>{
   const block = await Block.create(req.body);
   res.status(200).json(block);
}

const getBlocksBySociety = async(req,res)=>{
   const blocks = await Block.findAll({
     where : {society_id : req.params.societyId}
   });

   res.json(blocks);
}

module.exports = {createBlock, getBlocksBySociety};