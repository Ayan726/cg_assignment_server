const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "please provide title!!"],
  },
  description: {
    type: String,
    required: [true, "please provide description!!"],
  },
});

module.exports = mongoose.model("Task", TaskSchema);
