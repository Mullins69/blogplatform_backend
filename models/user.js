
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_id:{
    type: String
  },
  role:{
    type: String,
    required: true,
    default: 'reader'
  }
  ,
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
  ,
  join_date: {
    type: Date,
    required: false,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
