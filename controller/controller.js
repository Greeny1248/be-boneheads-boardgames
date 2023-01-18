const { response } = require("../app");
const { devData } = require("../db/data/development-data/index");
const {
  readCategories,
  readUsers,
  readReviews,
  fetchReviewById,
  fetchCommentsFromReview,
  createReviewComment,

  updateReviewVote,
} = require("../model/model.js");

const viewAllCategories = (req, res) => {
  readCategories()
    .then((categories) => {
      res.status(200).send({ categories });
    })
    .catch((err) => {
      next(err);
    });
};

const viewAllUsers = (req, res, next) => {
  readUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((err) => {
      {
        next(err);
      }
    });
};

const viewAllReviews = (req, res, next) => {
  const { sort_by } = req.query;
  const { order } = req.query;
  const { category } = req.query;
  readReviews(sort_by, order, category)
    .then((reviews) => {
      res.status(200).send({ reviews });
    })
    .catch((err) => {
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

const patchReviewVote = (req, res, next) => {
  const { review_id } = req.params;
  const { inc_votes } = req.body;

  updateReviewVote(review_id, inc_votes)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch(next);
};

module.exports = {
  viewAllCategories,
  viewAllReviews,
  viewReviewById,
  viewCommentsFromReview,
  postReviewComment,
  patchReviewVote,
  viewAllUsers,
};
