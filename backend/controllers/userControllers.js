const User = require("../models/User");
const Society = require("../models/Society");
const bcrypt = require("bcryptjs");
const { Flat, Block } = require("../models");

const createSocietyAdmin = async(req,res)=>{
    try{
        const {name, email, password, society_id} = req.body;

        // const existingAdmin = await User.findOne({
        //   where : {
        //      role : "SOCIETY_ADMIN",
        //      society_id
        //   }
        // });

        // if(existingAdmin) return res.status(400).json({message :  "Society Already has an Admin."})

        const hashed = await bcrypt.hash(password, 10);
        const admin = await User.create({
            name,
            email,
            password : hashed,
            role : "SOCIETY_ADMIN",
            society_id
        });
        res.status(200).json(admin);
    }
    catch(err){
        res.status(500).json({message : err.message});
    }

};

const getSocietyAdmins = async(req,res)=>{
    try{
      const admins = await User.findAll({
        where : {role : "SOCIETY_ADMIN"},
        include : {
          model : Society,
          attributes : ["id", "name"],
          required : false
        },
        attributes : ["id", "name", "email"]
      });

      const formatted = admins.map(a=>({
        id : a.id,
        name : a.name,
        email : a.email,
        societyName : a.Society ? a.Society.name : "NA"
      }));
      res.status(200).json(formatted);
    }
    catch(err){
      res.status(500).json({message : err.message});
    }
}

// const updateSocietyAdmin = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, email, society_id } = req.body;

//     const admin = await User.findByPk(id);
//     if (!admin || admin.role !== "SOCIETY_ADMIN") {
//       return res.status(404).json({ message: "Society Admin not found" });
//     }

//     await admin.update({ name, email, society_id });

//     res.json({ message: "Society Admin updated successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const deleteSocietyAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const admin = await User.findByPk(id);
    if (!admin || admin.role !== "SOCIETY_ADMIN") {
      return res.status(404).json({ message: "Society Admin not found" });
    }

    await admin.destroy();
    res.json({ message: "Society Admin deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




// -- Resident : 

const createResident = async(req,res)=>{
   try{
    const {name, email, password} = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const resident = await User.create({
        name,
        email,
        password : hashed,
        role: "RESIDENT",
        society_id : req.user.society_id
    });
     res.status(200).json(resident);

   }
   catch(err){
     res.status(500).json({message : err.message});
   }
};

const getResidents = async(req,res)=>{
    try{
      const residents = await User.findAll({
        where : {
          role : "RESIDENT",
          society_id: req.user.society_id
        },
        include : {
          model : Society,
          attributes : ["id", "name"],
          required : false
        },
        attributes : ["id", "name", "email"]
      });

      const formatted = residents.map(r=>({
        id : r.id,
        name : r.name,
        email : r.email,
        societyName : r.Society ? r.Society.name : "NA"
      }));
      res.status(200).json(formatted);
    }
    catch(err){
      res.status(500).json({message : err.message});
    }
}

const updateResident = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, society_id } = req.body;

    const resident = await User.findByPk(id);
    if (!resident || resident.role !== "RESIDENT") {
      return res.status(404).json({ message: "RESIDENT not found" });
    }

    await resident.update({ name, email, society_id });

    res.json({ message: "RESIDENT updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteResident = async (req, res) => {
  try {
    const { id } = req.params;

    const resident = await User.findByPk(id);
    if (!resident || resident.role !== "RESIDENT") {
      return res.status(404).json({ message: "Resident not found" });
    }

    await resident.destroy();
    res.json({ message: "Resident deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getUnassignedResidents = async (req, res) => {
  try {
    const residents = await User.findAll({
      where: {
        role: "RESIDENT",
        society_id: req.user.society_id
      },
      attributes: ["id", "name"],
      include: {
        model: Flat,
        required: false
      }
    });

    // filter residents not assigned to any flat
    const unassigned = residents.filter(r => !r.Flat);

    res.json(unassigned);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



const getResidentProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "name", "email"],
      include: [
        {
          model: Flat,
          attributes: ["id", "flat_number"],
          required: false, // IMPORTANT: allow resident without flat
          include: [
            {
              model: Block,
              attributes: ["id", "name"],
              include: [
                {
                  model: Society,
                  attributes: ["id", "name"]
                }
              ]
            }
          ]
        }
      ]
    });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//-- Guard :

const createGuard = async(req,res)=>{
    try{
       const {name, email, password} = req.body;
       const hashed = await bcrypt.hash(password, 10);

       const existingGuardCount = await User.count({
          where : {
             role : "GUARD",
             society_id : req.user.society_id
          }
       });

       if(existingGuardCount >= 2){
        return res.status(400).json({message : "Maximum 2 Guards Allowed per society."});
       }

       const guard = await User.create({
         name,
         email,
         password : hashed,
         role : "GUARD",
         society_id : req.user.society_id
       });
       
       res.status(200).json(guard);

    }
    catch(err){
        res.status(500).json({message : err.message});
    }
};

const getGuards = async(req,res)=>{
    try{
      const guards = await User.findAll({
        where : {
          role : "GUARD",
          society_id: req.user.society_id
        },
        include : {
          model : Society,
          attributes : ["id", "name"],
          required : false
        },
        attributes : ["id", "name", "email"]
      });

      const formatted = guards.map(g=>({
        id : g.id,
        name : g.name,
        email : g.email,
        societyName : g.Society ? g.Society.name : "NA"
      }));
      res.status(200).json(formatted);
    }
    catch(err){
      res.status(500).json({message : err.message});
    }
}

const deleteGuard = async (req, res) => {
  try {
    const { id } = req.params;

    const guard = await User.findByPk(id);
    if (!guard || guard.role !== "GUARD") {
      return res.status(404).json({ message: "Guard not found" });
    }

    await guard.destroy();
    res.json({ message: "Guard deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




// -- Accountant : 

const createAccountant = async(req,res)=>{
  try{
  const {name, email, password} = req.body;

  const accountantCount = await User.count({
     where : {
       role : "ACCOUNTANT",
       society_id : req.user.society_id
     }
  });

  if(accountantCount >= 1) return res.status(400).json({message : "Maximum 1 Accountant Allowed per Society"})

  const hashed = await bcrypt.hash(password, 10);
  const accountant = await User.create({
    name,
    email,
    password : hashed,
    role : "ACCOUNTANT",
    society_id : req.user.society_id
  });

   res.status(200).json(accountant);

  }
  catch(err){
    res.status(500).json({message : err.message});
  }

}


const getAccountant = async(req,res)=>{
    try{
      const accountant = await User.findAll({
        where : {
          role : "ACCOUNTANT",
          society_id: req.user.society_id
        },
        include : {
          model : Society,
          attributes : ["id", "name"],
          required : false
        },
        attributes : ["id", "name", "email"]
      });

      const formatted = accountant.map(a=>({
        id : a.id,
        name : a.name,
        email : a.email,
        societyName : a.Society ? a.Society.name : "NA"
      }));
      res.status(200).json(formatted);
    }
    catch(err){
      res.status(500).json({message : err.message});
    }
}

const deleteAccountant = async (req, res) => {
  try {
    const { id } = req.params;

    const accountant = await User.findByPk(id);
    if (!accountant || accountant.role !== "ACCOUNTANT") {
      return res.status(404).json({ message: "Accountant not found" });
    }

    await accountant.destroy();
    res.json({ message: "Accountant deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Reset Password for all users :
const resetPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Fetch logged-in user
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await user.update({ password: hashedPassword });

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {createSocietyAdmin, getSocietyAdmins, deleteSocietyAdmin, createResident, createGuard, createAccountant,
  getResidents, updateResident, deleteResident, getUnassignedResidents, getGuards, deleteGuard, getAccountant, deleteAccountant, getResidentProfile, resetPassword
};