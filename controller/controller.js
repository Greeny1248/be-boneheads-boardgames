const { response } = require("../app");
const { devData } = require("../db/data/development-data/index");
const {
  readCategories,
  readReviews,
  fetchReviewById,
  fetchCommentsFromReview,
  createReviewComment,
} = require("../model/model.js");

const viewAllCategories = (req, res) => {
  readCategories()
    .then((categories) => {
      res.status(200).send({ categories });
    })
    .catch((err) => {
      console.log(err);
    });
};

const viewAllReviews = (req, res, next) => {
  readReviews()
    .then((reviews) => {
      res.status(200).send({ reviews });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

const viewReviewById = (req, res, next) => {
  const { review_id } = req.params;

  fetchReviewById(review_id)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
const viewCommentsFromReview = (req, res, next) => {
  const { review_id } = req.params;
  fetchCommentsFromReview(review_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};
const postReviewComment = (req, res, next) => {
  const { review_id } = req.params;
  const { username, body } = req.body;
  createReviewComment(review_id, username, body)
    .then((newComment) => {
      res.status(201).send({ newComment });
    })
    .catch(next);
};

module.exports = {
  viewAllCategories,
  viewAllReviews,
  viewReviewById,
  viewCommentsFromReview,
  postReviewComment,
};
