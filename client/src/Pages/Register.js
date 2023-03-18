import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/v1/user/register", {
        username: input.name,
        email: input.email,
        password: input.password,
      });

      if (data) {
        alert("User registered Successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={10}
          boxShadow="10px 10px 10px 10px #ccc"
          padding={7}
          borderRadius={5}
        >
          <Typography variant="h4" padding={3} textAlign="center">
            Register
          </Typography>
          <TextField
            placeholder="name"
            name="name"
            value={input.name}
            type={"text"}
            margin="normal"
            required
            onChange={handleChange}
          />
          <TextField
            placeholder="email"
            value={input.email}
            name="email"
            type={"email"}
            margin="normal"
            required
            onChange={handleChange}
          />
          <TextField
            placeholder="password"
            value={input.password}
            name="password"
            type={"password"}
            margin="normal"
            required
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Submit
          </Button>
          <Button
            color="primary"
            sx={{ borderRadius: 3, marginTop: 3 }}
            onClick={() => navigate("/login")}
          >
            Already Register ? Login
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Register;
