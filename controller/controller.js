const { devData } = require("../db/data/development-data/index");
const {
  readCategories,
  readReviews,
  fetchReviewById,
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

const viewAllReviews = (req, res) => {
  readReviews()
    .then((reviews) => {
      res.status(200).send({ reviews });
    })
    .catch((err) => {
      console.log(err);
    });
};

const viewReviewById = (req, res, next) => {
  const { review_id } = req.params;
  console.log(req.params, "Req");
  fetchReviewById(review_id)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch(next);
};

module.exports = { viewAllCategories, viewAllReviews, viewReviewById };
