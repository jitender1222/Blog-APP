const express = require("express");
const {
  deleteBlog,
  getBlogById,
  getAllBlogs,
  createAllBlogs,
  updateBlog,
  userBlog,
} = require("../controller/blogController");

const router = express.Router();

// to get all the blog

router.get("/all-Blog", getAllBlogs);

// create the blog

router.post("/create-blog", createAllBlogs);

// update blog

router.put("/update-blog/:id", updateBlog);

// to get a single blog

router.get("/get-blog/:id", getBlogById);

// delete the single blog

router.delete("/delete-blog/:id", deleteBlog);

// user blog
router.get("/user-blog/:id", userBlog);

module.exports = router;
