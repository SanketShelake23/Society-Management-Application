const Block = require("../models/Block");
const Flat = require("../models/Flat");

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

const deleteBlock =  async(req,res)=>{
   try{
      const {id} = req.params;
      await Flat.destroy({where : {block_id : id}});
      await Block.destroy({where : {id}});
      res.json({ message: "Block deleted successfully" });
   }
   catch(err){
      res.status(500).json({message : err.message});
   }
};

module.exports = {createBlock, getBlocksBySociety, deleteBlock};