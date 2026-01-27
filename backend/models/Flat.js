const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");


const Flat = sequelize.define("Flat", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  flat_number: { type: DataTypes.STRING, allowNull: false },
  block_id: { type: DataTypes.INTEGER, allowNull: false },
  resident_id: { type: DataTypes.INTEGER, allowNull: true }
}, {
  tableName: "flats",
  timestamps: false
});



module.exports = Flat;
