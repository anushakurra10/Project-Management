const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
