const {
  readJson,
  readCategories,
  readUsers,
  readReviews,
  fetchReviewById,
  fetchCommentsFromReview,
  createReviewComment,
  updateReviewVote,
  removeCommentById,
} = require("../model/model.js");
const viewJSON = (req, res, next) => {
  readJson()
    .then((data) => {
      res.status(200).send({ data: JSON.parse(data) });
    })
    .catch((err) => {
      next(err);
    });
};

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

const deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  removeCommentById(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};

module.exports = {
  viewJSON,
  viewAllCategories,
  viewAllReviews,
  viewReviewById,
  viewCommentsFromReview,
  postReviewComment,
  viewAllUsers,
  patchReviewVote,
  deleteCommentById,
};
