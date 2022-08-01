const user = require("../model/user");
const path = require("path");

exports.createUser = async (req, res) => {
  //console.log(req.body)
  try {
    const Data = {
      name: req.body.name,
      profilePic: req.file.path,
    };
    const value = await user.create(Data);
    return res.json(value);
  } catch (error) {
    console.log(error);
  }
};
exports.getData = async (req, res) => {
  //console.log(req.body)
  try {
    const value = await user.find({ isDeleted: false });

    return res.json(value);
  } catch (error) {
    console.log(error);
  }
};
exports.update = async (req, res) => {
  try {
   // console.log(req.params.id)
    const query = { _id: req.params.id };
    const newvalues = { $set: { name: req.body.name } };
    const value = await user.findByIdAndUpdate(query, newvalues, {
      returnOriginal: false,
    });
    return res.json(value);
  } catch (error) {
    console.log(error);
  }
};
exports.deleteData = async (req, res) => {
  try {
    const id = { _id: req.params.id };
    const newvalues = { $set: req.body };
    const value = await user.findByIdAndUpdate(id, newvalues);

    return res.json(value);
  } catch (error) {
    console.log(error);
  }
};
