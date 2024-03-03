const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  nick: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "no aprobado",
  },
  description: {
    type: String,
  },
  notifications_config: {
    type: String,
    default: "all",
  },
  image: {
    type: String,
    default: "tesla-head.svg",
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model("User", UserSchema, "users");
