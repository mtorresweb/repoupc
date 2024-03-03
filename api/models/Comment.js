const { Schema, model } = require("mongoose");

const commentSchema = Schema({
  content: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  repository: {
    type: Schema.ObjectId,
    ref: "Repository",
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model("Comment", commentSchema, "comments");
