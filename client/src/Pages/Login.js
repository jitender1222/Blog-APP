import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
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
      const { data } = await axios.post("/api/v1/user/login", {
        email: input.email,
        password: input.password,
      });

      if (data.success) {
        dispatch(authActions.login());
        localStorage.setItem("userId", data?.user?._id);
        alert("User login Successfully");
        navigate("/");
      } else {
        alert("Password is not correct");
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
            Login
          </Typography>
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
            onClick={() => navigate("/register")}
          >
            Not a user ? Please Register
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Login;
