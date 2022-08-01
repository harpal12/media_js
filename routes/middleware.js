const multer = require("multer");
const path=require("path");


const Storage = multer.diskStorage({
  destination: "uploads",

  filename: (req, file, cb) => {
    var string = new Date().getTime();
    cb(null, string + file.originalname.replace(/\s/g, ""));
   // console.log(req.body)
  },
});

// const uploadFile = multer({
//   storage: Storage,
// })
//console.log(uploadFile)
//module.exports = Middleware = multer({ storage: Storage });

// module.exports = {uploadFile};
var uploadFiles = multer({ storage: Storage });

module.exports = {uploadFiles};