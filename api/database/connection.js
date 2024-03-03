const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/upcsa_repository");
    console.log("database connection established");
  } catch {
    console.log("couldn't connect to MongoDB database");
  }
};

module.exports = connection;
