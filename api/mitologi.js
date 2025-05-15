const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");

const mitologiRoutes = require("../routes/mitologiRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/mitologi", mitologiRoutes);

module.exports = serverless(app);

