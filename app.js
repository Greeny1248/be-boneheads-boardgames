const express = require("express");
const app = express();
app.use(express.json());
const { viewAllCategories, viewAllReviews } = require("./controller/controller");

app.get("/api/categories", viewAllCategories);
app.get("/api/reviews", viewAllReviews);

module.exports = app;
