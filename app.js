const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

const viewRouter = require("./routes/viewRoutes");
const dataRouter = require("./routes/dataRoutes");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(bodyParser.json());

app.use("/", viewRouter);
app.use("/api/data", dataRouter);

module.exports = app;
