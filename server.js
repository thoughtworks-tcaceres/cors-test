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

const jwt = require("jsonwebtoken");

app.post("/login", (req, res) => {
  const token = jwt.sign("admin", "tylergigeco");
  console.log(token);
  res.json({ token: token });
});

app.get("/getinfo", (req, res) => {
  let token = req.headers["authorization"];
  console.log("token: ", token);
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  const decoded = jwt.decode(token);
  if (decoded.sub === "admin") {
    return res.json({ orders: [{ id: 1 }, { id: 2 }] });
  }
  return res.json("error");
});

app.listen(PORT, () => {
  console.log("server has started");
});
