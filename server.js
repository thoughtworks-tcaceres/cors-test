const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/login", (req, res) => {
  res.send("hello world");
});

app.get("/getinfo", (req, res) => {
  console.log(req);
  res.json("data is here");
});

app.listen(PORT, () => {
  console.log("server has started");
});
