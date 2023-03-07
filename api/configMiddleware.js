const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const logger = require("./logger-middleware");
const server = express();
module.exports = function (server) {
  server.use(helmet());
  server.use(morgan("dev"));
  server.use(
    cors({
      origin: [
        "https://6ndr3.csb.app",
        "https://6ndr3.csb.app/home/discover",
        "*",
        // "https://b4f6vx-8001.preview.csb.app/api/listing/geo_address",
      ],
    })
  );
  server.use(logger);
  server.use(express.json());
};
