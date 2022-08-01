const comment = require("../model/comment");
 const post = require("../model/post");

exports.createComment = async (req, res) => {
  try {
    // console.log(req.body)
    const Data = {
      postId: req.body.postId,
      commentBy: req.body.commentBy,
      comment: req.body.comment,
    };
    const value = await comment.create(Data);
    return res.json(value);
  } catch (error) {
    console.error(error);
  }
};
exports.getComment = async (req, res) => {
  try {
    //const Data ={id:req.p
    // console.log(req.body.postId)
    const value = await comment.find({ postId: req.body.postId }).populate([
      {
        path: "postId",
        select: "name",
      },
      {
        path: "commentBy",
        select: "name",
      },
    ]);
    const totalcomment = value.length;

    console.log(req.body.postId);
    return res.json({ totalcomment, value });
  } catch (error) {
    console.log(error);
  }
};
// exports.getComment = async (req, res) => {
//   try {
//     //const query ={id:console.log(req.params.id)}
//     const value = await comment
//       .find({ postId: req.body.postId }, { isDeleted: false })
//       .populate([
//         {
//           path: "postId",
//           select: "name",
//         },
//         {
//           path: "commentBy",
//           select: "name",
//         },
//       ]);

//     return res.json(value);
//   } catch (error) {
//     console.log(error);
//   }
// };
exports.deleteData = async (req, res) => {
  try {
    // const id = {_id:req.params.id};
    //const newvalues = {$set: req.body}
    const value = await user.deleteMany();

    return res.json(value);
  } catch (error) {
    console.log(error);
  }
};
exports.update = async (req, res) => {
  try {
    // const query = { _id: req.params.id };
    // const newvalues = { $set: { comment: req.body.comment } };
    console.log(req.body.commentId)
   // console.log(comment:req.body.comment)
    const value = await comment.findByIdAndUpdate(req.body.commentId,{
      $set:{
       comment:req.body.comment
      }
    }, {
      returnOriginal: false,
    });
    console.log(value)
    return res.json(value);
  } catch (error) {
    console.log(error);
  }
};
exports.deleteComment = async (req, res) => {
  try {
    //const query = { _id: req.params.id };
    // console.log(req.body.commentId)
    // const newvalues = { $set: { isDeleted:req.body} };
    const value = await comment.findByIdAndUpdate(
      req.body.commentId,
      { $set: req.body },
      {
        returnOriginal: false,
      }
    );
    return res.json(value);
  } catch (error) {
    console.log(error);
  }
};
