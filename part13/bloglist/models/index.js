const User = require('./user');
const Blog = require('./blog');
const ReadingList = require('./readingList');
const sequelize = require('../util/db');

//User.hasMany(Blog)
//Blog.belongsTo(User)

User.belongsToMany(Blog, { through: "ReadingList" });
Blog.belongsToMany(User, { through: "ReadingList" });


const models = {
  User,
  Blog,
  ReadingList,
};

module.exports = {
  sequelize,
  models,
};