require("dotenv").config();
const bcrypt = require("bcryptjs");
const sequelize = require("../config/db");
const User = require("../models/User");

const seedSuperAdmin = async()=>{
   try{
      
      await sequelize.sync(); // ensure tables are exists.
   //    const hashedPass = await bcrypt.hash("superadmin123", 10);

   //    const superAdmin = await User.create({
   //       name : "Super Admin",
   //       email: "superadmin@example.com",
   //       password: hashedPass,
   //       role: "SUPER_ADMIN",
   //       status: "ACTIVE",
   //       society_id: null

   //    });

   //   console.log("Super Admin seeded:", superAdmin.email);


   // const hashedPass = await bcrypt.hash("123456", 10);

   //    const societyAdmin = await User.create({
   //       name : "Society Admin",
   //       email: "societyadmin@example.com",
   //       password: hashedPass,
   //       role: "SOCIETY_ADMIN",
   //       status: "ACTIVE",
   //       society_id: null

   //    });

   //   console.log("Society Admin seeded:", societyAdmin.email);

   const hashedPass = await bcrypt.hash("123456", 10);

      const committeeMember = await User.create({
         name : "Committee Member",
         email: "commiteemember@example.com",
         password: hashedPass,
         role: "COMMITTEE_MEMBER",
         status: "ACTIVE",
         society_id: null

      });

     console.log("Committee Member seeded:", committeeMember.email);
     process.exit();

   } catch(err){
     console.log(err);
   }
}

seedSuperAdmin();








