require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const authRoute = require("./routes/auth");
const todosRoute = require("./routes/todos");
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.get("/api", (req, res) => {
  res.send("request receved");
});

app.use("/api/auth", authRoute);
app.use("/api/todos", todosRoute);

mongoose
  .connect("mongodb://localhost:27017/ToDoList2DB")
  .then(() => {
    console.log("connected to the Database");

    app.listen(process.env.PORT, () => {
      console.log(`server running on ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
