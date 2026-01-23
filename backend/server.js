const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./config/db.js")
const authRoutes = require("./routes/authRoutes.js");
const societyRoutes = require("./routes/societyRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const blockRoutes = require("./routes/blockRoutes.js");
const flatRoutes = require("./routes/flatRoutes.js");
const noticeRoutes = require("./routes/noticeRoutes.js");
const complaintRoutes = require("./routes/complaintRoutes.js");

const app = express();
app.use(cors());
app.use(express.json());

// Routes :
app.use("/api/auth", authRoutes);
app.use("/api/societies", societyRoutes);
app.use("/api/users", userRoutes);
app.use("/api/blocks", blockRoutes);
app.use("/api/flats", flatRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/complaints", complaintRoutes);

// Checking Database Connectivity
sequelize.authenticate()
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err)); 


// Root Route
app.get("/", (req,res)=>{
    res.send("API is running..");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`App is running on port ${PORT}`);
})