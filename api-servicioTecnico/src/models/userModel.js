const { boolean } = require("joi");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  dni: { type: String, required: false },
  email: { type: String, required: true },
  password: [{ type: String, required: true }],
  from: { type: Array },
  aplication: { type: String },
  uniqueString: { type: String, required: true },
  emailVerification: { type: Boolean, required: true },
  role: { type: String, required: true, default: "user" },
  cart: { type: Array, required: false },
  /* cart:{
                product:
                cant:
              }*/
  // objeto carrito

  cellphone: { type: String, required: false, default: "" },
  street: { type: String, required: false, default: "" },
  city: { type: String, required: false, default: "" },
  state: { type: String, required: false, default: "" },
  postalCode: { type: Number, required: false, default: "" },
  country: { type: String, required: false, default: "" },

  //   buyhistory: { type: String, required: false },
  // productos/fechas/etc
});

const Users = mongoose.model("user", userSchema);

module.exports = Users;
