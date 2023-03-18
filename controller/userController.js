const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
// get all users

exports.getAllUsers = async (req, res) => {
  try {
    const user = await userModel.find({});
    return res.status(200).send({
      message: "All the Users",
      error: true,
      userCount: user.length,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in get all the user",
      success: false,
    });
  }
};

// register the user

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // validation

    if (!username || !email || !password) {
      return res.status(401).send({
        message: "Please Fill all the fields",
        success: false,
      });
    }

    // existing user

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      res.status(401).send({
        message: "User already exists",
        success: false,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    // save new user

    const newUser = new userModel({ username, email, password: hashPassword });
    await newUser.save();
    return res.status(200).send({
      message: "User saved successfully",
      success: true,
      newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error In Register the user",
      success: false,
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(401).send({
        message: "Please Fill all the fields",
        success: "false",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).send({
        message: "User not exist",
        success: "false",
      });
    }

    // password

    const checkPass = await bcrypt.compare(password, user.password);

    if (!checkPass) {
      res.status(401).send({
        message: "Password is not correct",
        sucess: "false",
      });
    }

    return res.status(200).send({
      message: "Password matched successfully",
      success: "true",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      message: "error in login the user",
      success: "false",
    });
  }
};
