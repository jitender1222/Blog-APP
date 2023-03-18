import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";

const BlogDetails = () => {
  const [showBlog, setShowBlog] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const getBlogDetails = async () => {
    try {
      const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`);
      if (data?.success) {
        setShowBlog(data?.blog);
        setInputs({
          title: data?.blog.title,
          description: data?.blog.description,
          image: data?.blog.image,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogDetails();
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/v1/blog/update-blog/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });

      if (data?.success) {
        alert("blog updated successfully");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          width={"80%"}
          border={3}
          borderRadius={10}
          padding={3}
          margin="auto"
          boxShadow="10px 10px 20px #ccc"
          display="flex"
          flexDirection={"column"}
          marginTop="30px"
        >
          <Typography
            textAlign="center"
            variant="h4"
            fontWeight="bold"
            color="gray"
            padding={2}
          >
            Edit A Post
          </Typography>
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Title
          </InputLabel>
          <TextField
            name="title"
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            require="true"
            value={inputs.title}
          />

          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Description
          </InputLabel>

          <TextField
            name="description"
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            require="true"
            value={inputs.description}
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Image
          </InputLabel>

          <TextField
            name="image"
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            require="true"
            value={inputs.image}
          />
          <Button type="submit" color="warning" variant="contained">
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
};

export default BlogDetails;
