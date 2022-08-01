module.exports =(app) => {
    const User = require("../controllers/userController");
    const Middleware = require("./middleware")
    const router = require("express").Router();

    router.post("/user",Middleware.uploadFiles.single("profilePic"),User.createUser);
    router.put("/:id",User.update);
    router.get("/user",User.getData);
    router.delete("/:id",User.deleteData)
    app.use("/api",router);
};