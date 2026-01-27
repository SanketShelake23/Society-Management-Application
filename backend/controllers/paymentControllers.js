const Bill = require("../models/Bill");
const Payment = require("../models/Payment");

const payBill = async(req,res)=>{
   try{
     const {bill_id, payment_mode} = req.body;

     const bill = await Bill.findByPk(bill_id);

     if (!bill) {
      return res.status(400).json({ message: "Bill not found" });
     }

     await Payment.create({
        bill_id,
        amount : bill.amount,
        payment_mode
     });

     await Bill.update(
        { status : "PAID"},
        {where : {id : bill_id}}
     );

     res.status(200).json({message: "Payment is Successful."})
   }
   catch(err){
     res.status(500).json({message : err.message});
   }
};

module.exports = {payBill}
