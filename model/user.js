const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    profilePic: { type: String, contentType: String },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
module.exports = user = mongoose.model("user", userSchema);
