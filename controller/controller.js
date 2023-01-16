const { devData } = require("../db/data/development-data/index");
const { readCategories, readReviews } = require("../model/model.js");

const viewAllCategories = (req, res) => {
  readCategories().then((categories) => {
    res.status(200).send({ categories });
  });
};

const viewAllReviews = (req, res) => {
    readReviews().then((reviews) => {
      res.status(200).send({ reviews });
    });
  };

module.exports = { viewAllCategories, viewAllReviews };
