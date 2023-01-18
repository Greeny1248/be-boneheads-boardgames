const db = require("../db/connection");

readCategories = () => {
  let queryString = `SELECT * 
  FROM categories`;
  return db
    .query(queryString)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(err);
    });
};
readUsers = () => {
  let queryString = `SELECT * 
  FROM users`;
  return db
    .query(queryString)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(err);
    });
};

readReviews = (sort_by = "created_at", order = "desc", category) => {
  let queryString = `SELECT reviews.*, CAST(COUNT(comments.review_id) AS int) AS comment_count
  FROM reviews
  JOIN comments ON reviews.review_id = comments.review_id `;
  const queryArray = [];
  const columnArray = [
    "owner",
    "title",
    "designer",
    "review_img_url",
    "review_body",
    "category",
    "created_at",
    "votes",
  ];
  const orderArray = ["asc", "desc"];
  if (category) {
    queryString += `WHERE category = $1`;
    queryArray.push(category);
  }
  if (!columnArray.includes(sort_by) || !orderArray.includes(order)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  queryString += ` GROUP BY reviews.review_id
  ORDER BY ${sort_by} ${order};`;
  return db.query(queryString, queryArray).then((res) => {
    if (res.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Category not found" });
    }
    return res.rows;
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
  const queryString = `SELECT comments.* FROM comments 
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
  readUsers,
  readReviews,
  fetchReviewById,
  fetchCommentsFromReview,
  createReviewComment,

  updateReviewVote,

};
