const express = require("express");
const cors = require('cors');
const app = express();
app.use(express.json());

const {
  viewJSON,
  viewAllCategories,
  viewAllReviews,
  viewReviewById,
  viewCommentsFromReview,
  postReviewComment,
  patchReviewVote,
  viewAllUsers,
  deleteCommentById,

} = require("./controller/controller");

app.use(cors());
app.get("/api", viewJSON);
app.get("/api/categories", viewAllCategories);
app.get("/api/users", viewAllUsers);
app.get("/api/reviews", viewAllReviews);
app.get("/api/reviews/:review_id", viewReviewById);
app.get("/api/reviews/:review_id/comments", viewCommentsFromReview);
app.post("/api/reviews/:review_id/comments", postReviewComment);
app.patch("/api/reviews/:review_id", patchReviewVote);
app.delete("/api/comments/:comment_id", deleteCommentById);

app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "Path not found" });
});
app.use((err, req, res, next) => {
  if (err.status === 400) {
    res.status(400).send({ msg: "Bad request" });
  } else {
    next(err);
  }
});
app.use((err, req, res, next) => {
  if (err.code === "23503") {
    res.status(404).send({ msg: "Path not found" });
  } else {
    next(err);
  }
});
app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad request" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});
app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal server error" });
});

module.exports = app;
