import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../component/BlogCard";

const Blogs = () => {
  const [blog, setBlog] = useState([]);

  const getAllBlog = async () => {
    try {
      const { data } = await axios.get("/api/v1/blog/all-blog");
      if (data?.success) {
        setBlog(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlog();
  }, []);
  return (
    <>
      {blog &&
        blog.map((blogs) => (
          <BlogCard
            key={blogs._id}
            id={blogs?._id}
            isUser={localStorage.getItem("userId") === blogs?.user?._id}
            title={blogs?.title}
            description={blogs?.description}
            image={blogs?.image}
            time={blogs?.createdAt}
            username={blogs?.user?.username}
          />
        ))}
    </>
  );
};

export default Blogs;
