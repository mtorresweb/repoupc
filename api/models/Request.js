const { Schema, model } = require("mongoose");

const RequestSchema = Schema({
  created_at: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    default: "creado",
  },
  reply: String,
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  admin: {
    type: Schema.ObjectId,
    ref: "Admin",
  },
  repository: {
    type: Schema.ObjectId,
    ref: "Repository",
    required: true,
  },
});

module.exports = model("Request", RequestSchema, "requests");
