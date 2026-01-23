const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Block = sequelize.define("Block", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  society_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: "blocks",
  timestamps: false
});

module.exports = Block;
