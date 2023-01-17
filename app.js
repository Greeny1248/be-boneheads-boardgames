const express = require("express");
const app = express();

const {
  viewAllCategories,
  viewAllReviews,
  viewReviewById,
} = require("./controller/controller");

app.get("/api/categories", viewAllCategories);
app.get("/api/reviews", viewAllReviews);
app.get("/api/reviews/:review_id", viewReviewById);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal server error" });
});
app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});
app.use((req, res, next) => {
  res.status(404).send({ msg: "Route Does Not Exist" });
  next(err);
});

module.exports = app;
