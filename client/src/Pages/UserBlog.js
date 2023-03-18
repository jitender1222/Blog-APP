import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../component/BlogCard";

const UserBlog = () => {
  const [blogs, setBlogs] = useState([]);

  // to get the blogs

  const getBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
      console.log("datatata", data);
      if (data?.success) {
        setBlogs(data?.userBlog?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBlogs();
  }, []);
  console.log(blogs);
  return (
    <div>
      {blogs && blogs.length > 0 ? (
        blogs.map((blogs) => (
          <BlogCard
            key={blogs._id}
            id={blogs._id}
            isUser={true}
            title={blogs.title}
            description={blogs.description}
            image={blogs.image}
            time={blogs.createdAt}
            username={blogs?.user?.username}
          />
        ))
      ) : (
        <h1>No Blog Found</h1>
      )}
    </div>
  );
};

export default UserBlog;
