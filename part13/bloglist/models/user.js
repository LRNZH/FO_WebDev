const { DataTypes, Model } = require('sequelize');
const sequelize = require('../util/db');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email address as username',
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'User',
    underscored: true,
    timestamps: true,
  }
);

module.exports = User;
