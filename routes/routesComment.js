module.exports = (app) => {
  const Comment = require("../controllers/commentController");
  const router = require("express").Router();

  router
    .route("/")
    .post(Comment.createComment)
    .get(Comment.getComment)
    .delete( Comment.deleteData)
    .put( Comment.update)
router.delete("/delete",Comment.deleteComment)

  app.use("/comment", router);
};
