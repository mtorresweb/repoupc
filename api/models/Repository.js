const { Schema, model } = require("mongoose");

const RepositorySchema = Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
  },
  type: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "creado",
  },
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  average_rating: {
    type: Number,
    default: 0,
  },
});

module.exports = model("Repository", RepositorySchema, "repositories");
