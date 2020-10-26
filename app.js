require("dotenv").config();
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const passport = require("passport");
const { port, logFormat } = require("config").get("app");
const routes = require("./route");
const db = require("./setup/db");
const cookieParser = require("cookie-parser");
const app = express();
app.set("view engine", "ejs");
app.set("public", path.join(__dirname, "public"));
// middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan(logFormat));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

const autMiddleware = require("./middleware/auth");
// setting up strategy
passport.use(autMiddleware.authenticationStartegy());
app.use(passport.initialize());
// using routes
app.use(routes);

// async connection to database
db.connect();
// error handler
app.use((err, req, res, next) => {
  if (err) {
    console.error(err);
    res.status(500).send(err.message);
  } else {
    next();
  }
});

// starting server
app.listen(port, () => {
  console.log("app is runnning on ", port);
});
