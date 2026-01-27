const Bill = require("../models/Bill");
const Flat = require("../models/Flat");


const createBill = async(req, res)=>{
    try{
    const { flat_id, amount, billing_month, due_date} = req.body;
    const bill = await Bill.create({
        flat_id,
        amount,
        billing_month,
        due_date
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
          include: {
            model: Flat,
            where: { },
          }
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
          }
       });

       res.status(200).json(bills);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }

};

module.exports = { createBill, getSocietyBills, getResidentBills};