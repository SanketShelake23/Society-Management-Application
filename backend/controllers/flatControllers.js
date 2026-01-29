const { User, Block } = require("../models");
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

const deleteFlat = async(req,res)=>{
    try{
      const {id} = req.params;
      await Flat.destroy({where : {id}});
      res.json({ message: "Flat deleted successfully" });
    }
    catch(err){
        res.status(500).json({message : err.message});
    }
};

const getUnassignedFlats = async (req, res) => {
  try {
    const flats = await Flat.findAll({
      where: {
        resident_id: null,
        
      },
      attributes: ["id", "flat_number"],
      include : {
         model : Block,
         attributes : [],
         where : { society_id : req.user.society_id}
      }
    });

    res.json(flats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAssignedFlats = async (req, res) => {
  try {
    const flats = await Flat.findAll({
      where: {
        resident_id: { [require("sequelize").Op.ne]: null }
      },
      attributes: ["id", "flat_number"],
      include: [ {
        model: User,
        attributes: ["id", "name"]
      },
      {
         model : Block,
         attributes : ["id", "name"],
         where : { society_id : req.user.society_id}
      } ]
    });

    res.json(flats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const unassignResident = async (req, res) => {
  try {
    const { flatId } = req.params;

    const flat = await Flat.findByPk(flatId);
    if (!flat) {
      return res.status(404).json({ message: "Flat not found" });
    }

    await flat.update({ resident_id: null });

    res.json({ message: "Resident unassigned successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {createFlat, getFlatsByBlock, assignResident, deleteFlat, getUnassignedFlats, getAssignedFlats, unassignResident};