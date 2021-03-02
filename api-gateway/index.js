const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");

const apiGateway = express();
apiGateway.use(cors());

apiGateway.get("/", (req, res) => {
  res.status(200).json({
    message: 'success'
  });
});

apiGateway.get("/version", (req, res) => {
  res.status(200).json({
    data: {
      release: process.env.RELEASE_NUMBER || '0.1',
      build: process.env.BUILD_NUMBER || '0.1',
    },
    message: 'success'
  });
});

apiGateway.on("unhandledException", error => {
  console.log("Unhandled Exception: ", error.message);
});

exports.handler = serverless(apiGateway, {
  request: function (req, event, context) {
    req.event = event;
    req.context = context;
  }
});
