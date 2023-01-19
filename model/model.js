const db = require("../db/connection");
const fs = require("fs/promises");
readJson = () => {
  return fs
    .readFile("./endpoints.json", (err, data) => {
      if (err) {
        console.log(err);
      }
      return data;
    })
    .then((data) => {
      return data;
    });
};
readCategories = () => {
  let queryString = `SELECT * 
  FROM categories`;
  return db
    .query(queryString)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {});
};
readUsers = () => {
  let queryString = `SELECT * 
  FROM users`;
  return db
    .query(queryString)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {});
};

readReviews = (sort_by = "created_at", order = "DESC", category) => {
  let queryString = `SELECT reviews.*, CAST(COUNT(comments.review_id) AS int) AS comment_count
  FROM reviews
  LEFT JOIN comments ON comments.review_id = reviews.review_id `;
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
  const categoryArray = [
    "euro game",
    "social deduction",
    "dexterity",
    "children's games",
  ];
  const orderArray = ["asc", "desc", "ASC", "DESC"];
  if (category) {
    queryString += `WHERE category = $1`;
    queryArray.push(category);
  }
  if (!columnArray.includes(sort_by) || !orderArray.includes(order)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  queryString += ` GROUP BY reviews.review_id
  ORDER BY reviews.${sort_by} ${order};`;
  return db.query(queryString, queryArray).then((res) => {
    if (res.rows.length === 0 && categoryArray.includes(category)) {
      return [];
    }
    if (res.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Category not found" });
    }
    return res.rows;
  });
};

fetchReviewById = (review_id) => {
  const queryString = `SELECT reviews.*, 
  CAST (COUNT (comments.body) AS INT)comment_count  
  FROM reviews 
  LEFT JOIN comments
  ON reviews.review_id = comments.review_id
  WHERE reviews.review_id = $1
  GROUP BY reviews.review_id`;
  return db.query(queryString, [review_id]).then(({ rows, rowCount }) => {
    if (rowCount === 0) {
      return Promise.reject({ status: 404, msg: "Path not found" });
    } else {
      return rows;
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

removeCommentById = (comment_id) => {
  const queryString = `DELETE FROM comments
  WHERE comment_id = $1
  RETURNING *;`;
  return db.query(queryString, [comment_id]).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Path not found" });
    }
    return rows;
  });
};

removeCommentById = (comment_id) => {
  const queryString = `DELETE FROM comments
  WHERE comment_id = $1
  RETURNING *;`;
  return db.query(queryString, [comment_id]).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Path not found" });
    }
    return rows;
  });
};

module.exports = {
  readJson,
  readCategories,
  readUsers,
  readReviews,
  fetchReviewById,
  fetchCommentsFromReview,
  createReviewComment,
  updateReviewVote,
  removeCommentById,
};
