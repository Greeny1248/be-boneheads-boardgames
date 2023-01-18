const { viewCommentsFromReview } = require("../controller/controller");
const db = require("../db/connection");

readCategories = () => {
  let queryString = `SELECT * 
  FROM categories`;
  return db
    .query(queryString)
    .then((results) => {
      return results.rows;
    })
    .catch((err) => {
      console.log(err);
    });
};

readReviews = () => {
  let queryString = `SELECT reviews.review_id, reviews.owner, reviews.title, reviews.category, review_img_url, reviews.created_at, reviews.votes, reviews.designer, (SELECT COUNT(*) FROM comments WHERE comments.review_id = reviews.review_id) AS comment_count
  FROM reviews
  JOIN comments ON reviews.review_id = comments.review_id
  GROUP BY reviews.review_id
  ORDER BY created_at DESC
  ;`;
  return db.query(queryString).then((results) => {
    return results.rows;
  });
};

fetchReviewById = (review_id) => {
  const queryString = `SELECT * FROM reviews WHERE reviews.review_id=$1`;
  return db.query(queryString, [review_id]).then(({ rows, rowCount }) => {
    if (rowCount === 0) {
      return Promise.reject({ status: 404, msg: "Path not found" });
    } else {
      return rows[0];
    }
  });
};

fetchCommentsFromReview = (review_id) => {
  const queryString = `SELECT comments.* FROM comments LEFT JOIN users ON comments.author = users.username
WHERE comments.review_id = $1
ORDER BY created_at DESC`;
  return db.query(queryString, [review_id]).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Path not found" });
    }
    return rows;
  });
};
createReviewComment = (review_id, username, body) => {
  if (!username || !body) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
  const queryString = `INSERT INTO comments (author, body, review_id) VALUES ($1, $2, $3) RETURNING *`;
  return db.query(queryString, [username, body, review_id]).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Path not found" });
    }
    return rows[0];
  });
};


updateReviewVote = (review_id, inc_votes) => {
  const queryString = `UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *`;
  return db.query(queryString, [inc_votes, review_id]).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Path not found" });
    }
    return rows[0];
  });
};



module.exports = {
  readCategories,
  readReviews,
  fetchReviewById,
  fetchCommentsFromReview,
  createReviewComment,

  updateReviewVote,

};
