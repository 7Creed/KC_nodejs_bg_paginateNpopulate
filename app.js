const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// mongodb://localhost:27017/kc_class2
// mongodb+srv://4chimabika:MIh0RmexgZykZW3n@cluster0.swjtnzq.mongodb.net/kc_class
const connection = mongoose
  .connect(
    "mongodb+srv://4chimabika:MIh0RmexgZykZW3n@cluster0.swjtnzq.mongodb.net/kc_class2"
  )
  // .connect("mongodb://localhost:27017/kc_class2")
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log("An error occured: ", error);
  });

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).send({ message: res.locals.error });

  // res.status(err.status || 500);
  // res.render("error");
});

module.exports = app;
