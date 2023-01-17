const express = require("express");
const app = express();

const {
  viewAllCategories,
  viewAllReviews,
} = require("./controller/controller");

app.get("/api/categories", viewAllCategories);
app.get("/api/reviews", viewAllReviews);

app.use((err, request, response, next) => {
  console.log(err);
  response.status(500).send({ msg: "Internal server error" });
});
app.use((request, response, next) => {
  response.status(404).send({ msg: "Route Does Not Exist" });
  next(err);
});

module.exports = app;
