const mongoose = require("mongoose");
const blogModel = require("../model/blogModel");
const userModel = require("../model/userModel");

// to create the blog

exports.createAllBlogs = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;
    //validation
    if (!title || !description || !image || !user) {
      return res.status(400).send({
        success: false,
        message: "Please Provide ALl Fields",
      });
    }
    const exisitingUser = await userModel.findById(user);
    //validaton
    if (!exisitingUser) {
      return res.status(404).send({
        success: false,
        message: "unable to find user",
      });
    }

    const newBlog = new blogModel({ title, description, image, user });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    exisitingUser.blogs.push(newBlog);
    await exisitingUser.save({ session });
    await session.commitTransaction();
    await newBlog.save();
    return res.status(201).send({
      success: true,
      message: "Blog Created!",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Creting blog",
      error,
    });
  }
};

// to get all the blog

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).populate("user");
    console.log("username", blogs.username);

    if (!blogs) {
      return res.status(401).send({
        message: "No blogs found",
        success: false,
      });
    }

    return res.status(200).send({
      blogCount: blogs.length,
      message: "All blogs found successfully",
      success: true,
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      message: "Error while fetching the blog",
      success: false,
    });
  }
};

// update the blog

exports.updateBlog = async (req, res) => {
  try {
    // to get the id
    const { id } = req.params;

    // to get all the fields
    const { title, description, image } = req.body;

    // update the blog by using id
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    return res.status(200).send({
      messgae: "Blog updated successfully",
      success: true,
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      message: "Error while updating the blog",
      success: false,
    });
  }
};

// get a single blog

exports.getBlogById = async (req, res) => {
  try {
    // get the id

    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).send({
        messgae: "Blog not found",
        success: "false",
      });
    }

    return res.status(200).send({
      message: "Blog found successfully",
      success: "true",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      message: "Error while updating the blog",
      success: false,
    });
  }
};

// delete the blog

exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await blogModel.findByIdAndDelete(id);

    if (!blog) {
      res.status(401).send({
        messgae: "Blog not found or it is already been deleted",
        success: "false",
      });
    }

    res.status(200).send({
      message: "Blog deleted successfully",
      success: "true",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      message: "Error while updating the blog",
      success: false,
    });
  }
};

//GET USER BLOG
exports.userBlog = async (req, res) => {
  try {
    const userBlog = await userModel.findById(req.params.id).populate("blogs");

    if (!userBlog) {
      return res.status(404).send({
        success: false,
        message: "blogs not found with this id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "user blogs",
      userBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error in user blog",
      error,
    });
  }
};
