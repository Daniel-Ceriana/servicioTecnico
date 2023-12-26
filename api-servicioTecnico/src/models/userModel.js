const { boolean } = require("joi");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: [{ type: Object, required: true }],
  from: { type: Array },
  aplication: { type: String },
  uniqueString: { type: String, required: true },
  uniqueString2: { type: String },
  emailVerification: { type: Boolean, required: true },
  role: { type: String, required: true, default: "user" },

});

const Users = mongoose.model("user", userSchema);

module.exports = Users;
