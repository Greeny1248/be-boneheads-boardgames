psql
\c nc_games

SELECT  reviews.review_id, comments.review_id, owner, title, category, review_img_url, comments.created_at, comments.votes, designer, reviews.review_id, COUNT (comment_id) AS "comment_count"
  FROM reviews
  JOIN comments
  ON reviews.review_id = comments.review_id
  GROUP BY reviews.review_id
 ORDER BY created_at DESC;

 SELECT  reviews.review_id, reviews.owner, reviews.title, reviews.category, review_img_url, reviews.created_at, reviews.votes, reviews.designer,  COUNT (comments.review_id)::INT AS "comment_count"
  FROM reviews
  JOIN comments
  ON reviews.review_id = comments.review_id
  GROUP BY reviews.review_id
  ORDER BY created_at DESC
  ;`