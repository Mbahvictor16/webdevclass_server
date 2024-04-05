const mongoose = require("mongoose");

const Users = new mongoose.Schema({
  firstName: {
    type: "string",
    required: true,
    maxLength: 255,
  },
  lastName: {
    type: "string",
    required: true,
    maxLength: 255,
  },
  userName: {
    type: "string",
    required: true,
    unique: true,
    maxLength: 255,
  },
  email: {
    type: "string",
    required: true,
    unique: true,
    maxLength: 255,
  },
  password: {
    type: "string",
    required: true,
  }
});

module.exports = mongoose.model("Users", Users);
