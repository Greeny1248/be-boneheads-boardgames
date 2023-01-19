SELECT reviews.*, CAST(COUNT(comments.review_id) AS int) AS comment_count
  FROM reviews
  JOIN comments ON reviews.review_id = comments.review_id GROUP BY reviews.review_id 
  ORDER BY ${sort_by} ${order}