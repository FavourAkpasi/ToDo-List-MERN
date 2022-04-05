require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const authRoute = require("./routes/auth");
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get("/api", (req, res) => {
  res.send("request receved");
});

app.use("/api/auth", authRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to the Database");

    app.listen(process.env.PORT, () => {
      console.log(`server running on ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
