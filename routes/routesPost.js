const post = require("../model/post");

module.exports = (app) => {
  const Post = require("../controllers/postController");
  const Middleware = require("./middleware");
  const router = require("express").Router();



  router.post( "/post",Middleware.uploadFiles.array("profilePic",12),Post.createPost);
  router.get("/post", Post.getAllPost);
  router.get("/postId", Post.getPost);
  router.put("/post",Post.updatePost);
  router.put("/like", Post.likePost);
  router.delete("/delete",Post.deletepost);
  app.use("/appi", router);
};
