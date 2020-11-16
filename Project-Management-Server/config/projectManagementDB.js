// This file will handle connection to logic to the MongoDB database

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/ProjectManagement", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB successfully :)");
  })
  .catch(e => {
    console.log("Error while attempting to connect to MongoDB");
    console.log(e);
  });

mongoose.set("useCreateIndex", true);

module.exports = {
  mongoose
};
