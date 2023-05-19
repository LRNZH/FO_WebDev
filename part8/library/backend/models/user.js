const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  favoriteGenre: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
});

userSchema.plugin(uniqueValidator);
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
