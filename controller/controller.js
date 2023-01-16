const { devData } = require("../db/data/development-data/index");
const { readCategories } = require("../model/model.js");

const viewAllCategories = (req, res) => {
  readCategories().then((categories) => {
    res.status(200).send({ categories });
  });
};

module.exports = { viewAllCategories };
