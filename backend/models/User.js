const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  phone: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { 
    type: DataTypes.ENUM('SUPER_ADMIN','SOCIETY_ADMIN','COMMITTEE_MEMBER','RESIDENT','GUARD','ACCOUNTANT'), 
    allowNull: false 
  },
  society_id: { type: DataTypes.INTEGER, allowNull: true },
  status: { type: DataTypes.ENUM('ACTIVE','INACTIVE'), defaultValue: 'ACTIVE' }
}, {
  tableName: "users",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: false
});

module.exports = User;
