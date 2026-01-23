const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const VisitorLog = sequelize.define("VisitorLog", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  visitor_name: { type: DataTypes.STRING },
  flat_id: { type: DataTypes.INTEGER, allowNull: false },
  guard_id: { type: DataTypes.INTEGER, allowNull: false },
  entry_time: { type: DataTypes.DATE },
  exit_time: { type: DataTypes.DATE }
}, {
  tableName: "visitor_logs",
  timestamps: false
});

module.exports = VisitorLog;
