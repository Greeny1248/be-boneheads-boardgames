const { devData } = require("../db/data/development-data/index");
const { readCategories, readReviews } = require("../model/model.js");

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

module.exports = { viewAllCategories, viewAllReviews };
