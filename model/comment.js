const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "post" },
    commentBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    comment: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
module.exports = comment = mongoose.model("comment", commentSchema);
