const express = require("express");
const app = express();
app.use(express.json());
const { viewAllCategories } = require("./controller/controller");

app.get("/api/categories", viewAllCategories);

module.exports = app;
