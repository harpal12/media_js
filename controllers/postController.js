const Post = require("../model/post");
const path = require("path");
const user = require("../model/user");
const post = require("../model/post");
const ObjectId = require("mongodb").ObjectID;
//const fs = require("fs")

exports.createPost = async (req, res) => {

  try{
  //      console.log(req.files);
       let  imageId = [];
       if (req.files) {
      
       for (var i = 0; i < req.files.length; i++) {
          let images= req.files[i].path;
          imageId.push(images);
  
      }
    }
   
    let Data = {
      createdBy: req.body.createdBy,
     images: imageId,

      likedBy: req.body.likedBy
    
  
    }
    const data = await Post.create(Data);
    return res.json(data);
  }catch(error)
  {
    console.error(error);
  }
    
      
   } 
  
exports.getPost = async (req, res) => {
  try {
    const value = await Post.findById(req.body.postId, {
      isDeleted: false,
    }).populate([
      {
        path: "createdBy",
        select: "name",
      },
      { path: "likedBy", select: "name" },
      { path: "viewedBy" },
    ]);
    //console.log(req.body.userId);
    if (!value.viewedBy.includes(req.body.userId)) {
      await value.updateOne(
        { $addToSet: { viewedBy: req.body.userId } },
        { returnOriginal: false,}
      );
    }
    const totalview = value.viewedBy.length;
    const totalliked = value.likedBy.length;
    if (value) res.json({ totalliked, totalview, value });
  } catch (error) {
    console.log(error);
  }
};
exports.getAllPost = async (req, res) => {
  try {
    //const query = { id: req.params.id };

    const value = await Post.find().populate([
      {
        path: "createdBy",
        select: "name",
      },
      { path: "likedBy", select: "name" },
    ]);
    return res.json(value);
  } catch (error) {
    console.log(error);
  }
};
exports.updatePost = async (req, res) => {
  //console.log({_id:req.body.id})
  // console.log(req.body.id)
  try {
   // const query = await Post.By( req.body.id );
    //console.log(query)
    const newvalues = {
      $set: {
        createdBy: req.body.createdBy,
        //image:req.file.path,
        text: req.body.text,
        likedBy: req.body.likedBy,
      },
    };
    const value = await Post.findByIdAndUpdate(req.body.postId,{$set: {
      createdBy: req.body.createdBy,
      //image:req.file.path,
      text: req.body.text,
      likedBy: req.body.likedBy,
    }},
    {
      returnOriginal: false,
    });
    return res.json(value);
  } catch (error) {
    console.log(error);
  }
};
exports.likePost = async (req, res) => {
  try {
    //console.log({ postId: req.body.postId });
    const user2 = await Post.findById(req.body.postId, { isDeleted: false });

    if (!user2.likedBy.includes(req.body.likeId)) {
      await Post.updateOne(
        {
          _id: req.body.postId,
        },
        { $push: { likedBy: req.body.likeId } },
        { new: true }
      );
      return res.json("like");
    } else {
      await Post.updateOne(
        {
          _id: req.body.postId,
        },
        { $pull: { likedBy: req.body.likeId } },
        { new: true }
      );
      return res.json("unlike");
    }
  } catch (error) {
    console.log(error);
  }
};
exports.deletepost = async (req, res) => {
  try {
    //const query = { _id: req.params.id };
    // console.log(req.body.commentId)
    // const newvalues = { $set: { isDeleted:req.body} };
    const value = await Post.findByIdAndUpdate(
      req.body.postId,
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
