const express = require("express");
const morgan = require("morgan");
const colors = require("colors");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// configure dotenv

dotenv.config();

// router

const userRoute = require("./router/userRouter");
const blogRoute = require("./router/blogRoute");

// mongodb connection

connectDB();

// object creation

const app = express();

// middlewear

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes

app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);

// app.get('/',);

// PORT

const PORT = process.env.PORT || 8080;

// listen

app.listen(8080, () => {
  console.log(`Server is running at Port ${PORT}`.bgCyan.white);
});
