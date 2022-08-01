const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });


//const userRouter = require("./routes/routes");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();
const URL= process.env.URL

mongoose.connect(URL,{ useNewUrlParser: true,useunifiedTopology:true, });

mongoose.connection.on("error", (err) => {
  console.log("connection failed");
});
mongoose.connection.on("connected", (connected) => {
  console.log("connected with mongodb");

});
// mongoose.connect(url, { useNewUrlParser: true });

app.use(express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// app.use(
//   fileUpload({
//     limits: { fileSize: 5 * 1024 * 1024 },
//   })
// );
app.use("/uploads", express.static("uploads"));

require("./routes/routesUser")(app);
require("./routes/routesPost")(app);
require("./routes/routesComment")(app);
//app.use("/user", userRouter);

const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});