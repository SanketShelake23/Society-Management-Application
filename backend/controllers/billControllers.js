const { User, Block, Society } = require("../models");
const Bill = require("../models/Bill");
const Flat = require("../models/Flat");

const addDays = (days)=>{
   const date = new Date();
   date.setDate(date.getDate()+days);
   return date;
}

const createBill = async(req, res)=>{
    try{
    const { flat_id, title, amount, billing_month, due_date} = req.body;
    const bill = await Bill.create({
        flat_id,
        title,
        amount,
        billing_month,
        due_date : addDays(30)
    });

      res.status(200).json(bill);
    }
    catch(err){
        res.status(500).json({message : err.message});
    }
};

const getSocietyBills = async(req,res)=>{
    try{
       const bills = await Bill.findAll({
          include: [
            {
            model: Flat,
            required : true,
            attributes : ["id", "flat_number"],
            include : [
                {
                    model : Block,
                    required : true,
                    attributes : ["id", "name"],
                    where : { society_id : req.user.society_id}
                    
                },
                 {
                    model : User,
                    attributes : ["id","name"]
                }
            ]
           }
          ],
        
          order : [["created_at", "DESC"]]
       });

       res.status(200).json(bills);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }

};

const getResidentBills = async(req,res)=>{

     try{
       const bills = await Bill.findAll({
          include: {
            model: Flat,
            where: {  resident_id : req.user.id },
          },
          order : [["created_at", "DESC"]]
       });

       res.status(200).json(bills);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }

};

module.exports = { createBill, getSocietyBills, getResidentBills};