const mongoose = require("mongoose");

// const LikedBySchema = new mongoose.Schema(
//   { userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" } },
//   { timestamps: true }
// );

// const commentSchema = new mongoose.Schema(
//   {
//     postId: { type: mongoose.Schema.Types.ObjectId, ref: "post" },
//     commentBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
//     comment: { type: String, required: true },
//     isDeleted: { type: Boolean, default: false },
//   },
//   {
//     timestamps: true,
//   }
// );
const postSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    images: [
      {
        type: String,
        contantType: String,
      },
    ],
    Text: { type: String },
    // likedBy: [LikedBySchema],
    // comments: [commentSchema],
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],

    viewedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
   
    isDeleted: { type: Boolean, default: false },
  },

  {
    timestamps: true,
  }
);

module.exports = post = mongoose.model("post", postSchema);
