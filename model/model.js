const db = require("../db/connection");

readCategories = () => {
  let queryString = `SELECT * 
  FROM categories`;
  return db
    .query(queryString)
    .then((results) => {
      console.log(results.rows);
      return results.rows;
    })
    .catch((err) => {
      console.log(err);
    });
};

readReviews = () => {
  let queryString = `SELECT  reviews.review_id, comments.review_id, owner, title, category, review_img_url, comments.created_at, comments.votes, designer, reviews.review_id, COUNT (comment_id) AS "comment_count"
  FROM reviews
  JOIN comments
  ON reviews.review_id = comments.review_id
  GROUP BY reviews.review_id
 ORDER BY created_at DESC;`;
  return db.query(queryString).then((results) => {
    console.log(results.rows, "RESULTS");
    return results.rows;
  });
};
module.exports = { readCategories, readReviews };
