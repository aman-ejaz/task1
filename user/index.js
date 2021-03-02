const serverless = require("serverless-http");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./routes/index");
const qs = require("qs");

const user = express();
user.use(cors());

user.use(bodyParser.json());
user.use(bodyParser.urlencoded({ extended: true }));

user.use("/", (req, res, next) => {
  if (req._parsedUrl.search) {
    req.query = qs.parse(req._parsedUrl.search.replace("?", ""), { depth: 10 });
  }
  next();
});

user.use("/", router);

user.on("unhandledException", error => {
  console.log("Unhandled Exception: ", error.message);
});

exports.handler = serverless(user, {
  request: function (req, event, context) {
    req.event = event;
    req.context = context;
  }
});