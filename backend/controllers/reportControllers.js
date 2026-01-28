const {Bill, Flat, User, Block, Payment} = require("../models");
const { generatePDF } = require("../utils/pdfGenerator");

const billsReport = async(req, res)=>{
    const bills = await Bill.findAll({
        include : {
            model : Flat,
            include : [
                { model : User, attributes: ["name"] },
                { model : Block, attributes: ["name"] }
            ]
        }
    });

    const rows = bills.map(b=>
        `Flat : ${b.Flat.flat_number}, Resident: ${b.Flat.User?.name || "NA"}, Amount: ${b.amount}, Status: ${b.status}`
    );

    generatePDF(res,"Bills_Report", rows);
};


const paymentReport = async(req,res)=>{
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
        }
    });

    const rows = payments.map(p=>(
         `Resident: ${p.Bill.Flat.User?.name}, Amount: ${p.amount}, Mode: ${p.payment_mode}, Date: ${p.payment_date}`
    ));

    generatePDF(res, "Payment_Report", rows);
}

const residentBillReport = async(req,res)=>{
    const bills = await Bill.findAll({
        include : {
            model : Flat,
            where : {resident_id : req.user.id }
        }
    });

    const rows = bills.map(b=>(
       `Month: ${b.billing_month}, Amount: ${b.amount}, Status: ${b.status}`
    ));

    generatePDF(res, "My_Bills_Report" ,rows);
};

module.exports = {billsReport, paymentReport, residentBillReport};