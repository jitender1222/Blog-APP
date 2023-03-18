const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    // blogs: [
    //   {
    //     _id: false,
    //     title: {
    //       type: String,
    //       require: [true, "title is required"],
    //     },
    //     description: {
    //       type: String,
    //       required: [true, "description is require"],
    //     },
    //     image: {
    //       type: String,
    //       required: [true, "image is require"],
    //     },
    //   },
    // ],

    blogs: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Blog",
      },
    ],
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
