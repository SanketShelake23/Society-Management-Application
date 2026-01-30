const visitorLog = require("../models/VisitorLog");
const Flat = require("../models/Flat");
const VisitorLog = require("../models/VisitorLog");
const Block = require("../models/Block");

const addVisitor = async(req, res)=>{
   try{
   const { visitor_name, purpose, flat_id} = req.body;
   const visitor = await visitorLog.create({
     visitor_name,
     purpose,
     flat_id,
     guard_id : req.user.id,
     entry_time : new Date()
   });
     res.status(200).json(visitor);
   }
   catch(err){
     res.status(500).json({message : err.message});
   }
};  

const markExit = async(req, res)=>{
   try{
     await visitorLog.update(
        {exit_time : new Date()},
        {where : { id : req.params.id}}
     );
     
     res.status(200).json({message : "Visitor's Exit is marked."})
   }
   catch(err){
     res.staus(500).json({message : err.message});
   }
};

const getSocietyVisitors = async(req,res)=>{
   try{
     const visitors = await VisitorLog.findAll({
        include : [
          {
            model : Flat,
            required : true,
            attributes : ["id","flat_number"],
            include : [
              {
                model: Block,
                required : true,
                attributes: ["id","name"],
                where : {
                  society_id : req.user.society_id
                }
              }
            ]
          }
        ],
        order: [["entry_time", "DESC"]]
     });
     res.status(200).json(visitors);
   }
   catch(err){
     res.status(500).json({message : err.message});
   }
};


const getResidentVisitors = async(req,res)=>{
    try{
        const flat = await Flat.findOne({
            where : {resident_id : req.user.id}
        });

        if(!flat){
            res.status(400).json({message : "Flat is not assigned yet."});
        }
     
        const visitors = await VisitorLog.findAll({
            where : {flat_id : flat.id},
            order : [["entry_time", "DESC"]]
        });

        res.status(200).json(visitors);
    }
    catch(err){
        res.status(500).json({message : err.message});
    }
}


const getSocietyBlocksForGuard = async (req, res) => {
  try {
    const blocks = await Block.findAll({
      where: { society_id: req.user.society_id },
      attributes: ["id", "name"]
    });

    res.json(blocks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports = {addVisitor, markExit, getSocietyVisitors, getResidentVisitors, getSocietyBlocksForGuard};