const Complaint = require("../models/Complaint");


// Admin : 
const getComplaints = async(req,res)=>{
    try{
        const complaints = await Complaint.findAll({
          where : { society_id : req.user.society_id},
          order : [["created_at", "DESC"]]
        });

        res.status(200).json(complaints);

    }
    catch(err){
        res.status(500).json({message : err.message});
    }

}

const updateStatus = async(req,res)=>{
    try{
      const {status} = req.body;
      await Complaint.update(
        {status} ,
        {where : {id : req.params.id}}
      );
      res.status(200).json({message : "Complaint Status is updated."});
    }
    catch(err){
        res.status(500).json({message : err.message});
    }

}



// Resident :

const createComplaint = async(req,res)=>{
    try{
    const {title, description} = req.body;
    const complaint = await Complaint.create({
        title,
        description,
        resident_id : req.user.id,
        society_id : req.user.society_id
    });
      res.status(200).json(complaint);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

const getMyComplaints = async(req,res)=>{
    try{
    const complaints = await Complaint.findAll({
        where : {resident_id : req.user.id},
        order : [["created_at" , "DESC"]]
    });
      res.status(200).json(complaints);
    }
    catch(err){
        res.status(500).json({message : err.message});
    }
}

module.exports = {getComplaints, updateStatus, createComplaint, getMyComplaints};