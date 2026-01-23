const Notice = require("../models/Notice");

const createNotice = async(req, res)=>{

    try{
     const {title, description} = req.body;
     const notice = await Notice.create({
        title,
        description,
        society_id : req.user.society_id
     });
     res.status(200).json(notice);
    }
    catch(err){
        res.status(500).json({ message : err.message });
    }
};

const getNotices = async(req,res)=>{
    try{
        const notices = await Notice.findAll({
            where : {society_id : req.user.society_id},
            order : [["created_at", "DESC"]]
        });
       res.status(200).json(notices);
    }
    catch(err){
        res.status(500).json({ message : err.message});
    }
};

module.exports = {createNotice, getNotices}