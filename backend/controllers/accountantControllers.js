const { Bill, Flat, User, Block, Payment } = require("../models");


const getSocietyBills = async(req,res)=>{
   try{
     const bills = await Bill.findAll({
        include : {
            model : Flat,
            include : [
                {
                  model : User,
                  attributes : ["id", "name"]
                },
                {
                  model : Block,
                  attributes : ["name"]
                }
            ]
        }
     });

     res.status(200).json(bills);
   }
   catch(err){
     res.status(500).json({message : err.message});
   }
};

const getPayments = async(req,res)=>{
   try{
     const payments = await Payment.findAll({
        include : {
            model : Bill,
            include : {
                model : Flat,
                include : {
                    model : User,
                    attributes : ["name"]
                }
            }
        },
        order : [["payment_date", "DESC"]]
     });

     res.status(200).json(payments);
   }
   catch(err){
     res.status(500).json({message : err.message});
   }
}

const monthlyCollection = async(req,res)=>{
   try{
     const result = await Payment.findAll({
        attributes : [
            "payment_mode",
            [Payment.sequelize.fn("SUM", Payment.sequelize.col("amount")), "total"]
        ],
        group : ["payment_mode"]
     });
     res.status(200).json(result);
   }
   catch(err){
     res.status(500).json({message : err.message});
   }
}

module.exports = {getSocietyBills, getPayments, monthlyCollection};