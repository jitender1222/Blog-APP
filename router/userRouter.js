const express = require("express");
const {
  getAllUsers,
  registerUser,
  loginUser,
} = require("../controller/userController");

// router object

const router = express.Router();

// to get all the users
router.get("/allusers", getAllUsers);

// ṭo register the user
router.post("/register", registerUser);

// to login the user
router.post("/login", loginUser);

module.exports = router;
