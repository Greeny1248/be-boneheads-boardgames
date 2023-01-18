const app = require("../app.js");
const data = require("../db/data/test-data");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const { expect } = require("@jest/globals");

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(data);
});

describe("app", () => {
  describe("GET /api/categories", () => {
    test("status:200 and response message", () => {
      return request(app).get("/api/categories").expect(200);
    });
    describe("GET /api/categories", () => {
      test("returns an array of objects with a slug and desc", () => {
        return request(app)
          .get("/api/categories")
          .expect(200)
          .then((res) => {
            res.body.categories.forEach((category) => {
              expect(typeof category).toBe("object");
              expect(category.hasOwnProperty("description")).toBe(true);
              expect(category.hasOwnProperty("slug")).toBe(true);
            });
            expect(res.body.categories.length).toBeGreaterThan(1);
          });
      });
    });
  });
  describe("GET /api/reviews", () => {
    test("status:200 and response message", () => {
      return request(app).get("/api/reviews").expect(200);
    });
    describe("GET /api/reviews", () => {
      test("returns an array of objects with an owner, title, review_id, category, review_img_url, created_at, votes, designer", () => {
        return request(app)
          .get("/api/reviews")
          .expect(200)
          .then((res) => {
            res.body.reviews.forEach((review) => {
              expect(typeof review).toBe("object");
              expect(review.hasOwnProperty("owner")).toBe(true);
              expect(review.hasOwnProperty("title")).toBe(true);
              expect(review.hasOwnProperty("review_id")).toBe(true);
              expect(review.hasOwnProperty("category")).toBe(true);
              expect(review.hasOwnProperty("review_img_url")).toBe(true);
              expect(review.hasOwnProperty("created_at")).toBe(true);
              expect(review.hasOwnProperty("votes")).toBe(true);
              expect(review.hasOwnProperty("designer")).toBe(true);
            });
          });
      });
      test("returns total count of all the comments with this review_id", () => {
        return request(app)
          .get("/api/reviews")
          .expect(200)
          .then((res) => {
            res.body.reviews.forEach((review) => {
              expect(review.hasOwnProperty("comment_count")).toBe(true);
            });
          });
      });
      test("returns in date descending order", () => {
        return request(app)
          .get("/api/reviews")
          .expect(200)
          .then((res) => {
            expect(res.body.reviews).toBeSorted("created_at", {
              descending: true,
            });
          });
      });
      describe("GET /api/reviews", () => {
        test("returns an object with the correct review_id from the query query with an owner, title, review_id, category, review_img_url, created_at, votes, designer", () => {
          return request(app)
            .get("/api/reviews/1")
            .expect(200)
            .then((res) => {
              const review = res.body.review;
              expect(typeof review).toBe("object");
              expect(review.hasOwnProperty("owner")).toBe(true);
              expect(review.hasOwnProperty("title")).toBe(true);
              expect(review.hasOwnProperty("review_id")).toBe(true);
              expect(review.hasOwnProperty("category")).toBe(true);
              expect(review.hasOwnProperty("review_img_url")).toBe(true);
              expect(review.hasOwnProperty("created_at")).toBe(true);
              expect(review.hasOwnProperty("votes")).toBe(true);
              expect(review.hasOwnProperty("designer")).toBe(true);
              expect(review.hasOwnProperty("review_body")).toBe(true);
            });
        });
      });
    });
  });
});
describe("GET /api/reviews/:review_id/comments", () => {
  test("status:200 and response message", () => {
    return request(app).get("/api/reviews").expect(200);
  });
  describe("GET /api/reviews/:review_id/comments", () => {
    test("returns an array of comments with comment_id, votes, created_at, author, body, review_id", () => {
      return request(app)
        .get("/api/reviews/2/comments")
        .expect(200)
        .then((res) => {
          res.body.comments.forEach((review) => {
            expect(typeof review).toBe("object");
            expect(review.hasOwnProperty("comment_id")).toBe(true);
            expect(review.hasOwnProperty("votes")).toBe(true);
            expect(review.hasOwnProperty("created_at")).toBe(true);
            expect(review.hasOwnProperty("author")).toBe(true);
            expect(review.hasOwnProperty("body")).toBe(true);
            expect(review.hasOwnProperty("review_id")).toBe(true);
          });
        });
    });
    test("returns most recent comments first", () => {
      return request(app)
        .get("/api/reviews/2/comments")
        .expect(200)
        .then((res) => {
          expect(res.body.comments).toBeSorted("created_at", {
            descending: true,
          });
        });
    });
    describe("Error Testing", () => {
      test("Testing for a 404 error with a route that does not exist", () => {
        return request(app)
          .get("/api/404fault")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("Path not found");
          });
      });
      describe("Test the 400 error path", () => {
        test("It should return a 400 error", async () => {
          return request(app)
            .get("/api/reviews/bad-request")
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toBe("Bad request");
            });
        });
      });
      test("Testing for a 404 error with a invalid review_id that does not exist", () => {
        return request(app)
          .get("/api/reviews/9999")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("Path not found");
          });
      });
    });
  });
});
describe("POST /api/reviews/:review_id/comments", () => {
  test("status:201 and returns newComment", () => {
    const newComment = {
      username: "dav3rid",
      body: "Cool game bro",
    };
    return request(app)
      .post("/api/reviews/1/comments")
      .send(newComment)
      .expect(201)
      .then(({ body: { newComment } }) => {
        expect(newComment.hasOwnProperty("review_id")).toBe(true);
        expect(newComment.hasOwnProperty("votes")).toBe(true);
        expect(newComment.hasOwnProperty("author")).toBe(true);
        expect(newComment.hasOwnProperty("body")).toBe(true);
        expect(newComment.hasOwnProperty("created_at")).toBe(true);
      });
  });
});
test("Status 400 Bad request, needs username and body", () => {
  const newComment = { body: "Bad game bro" };
  return request(app)
    .post("/api/reviews/1/comments")
    .send(newComment)
    .expect(400)
    .then(({ body: { msg } }) => {
      expect(msg).toBe("Bad request");
    });
});
test("Status 400 Bad request, needs valid username from users.js file.", () => {
  const newComment = {
    username: "NotAUser", body: "",
  };
  return request(app)
    .post("/api/reviews/1/comments")
    .send(newComment)
    .expect(400)
    .then(({ body: { msg } }) => {
      expect(msg).toBe("Bad request");
    });
});

test("Status 404 path not found, if review_id entered is valid but does not exist", () => {
  const newComment = {
    username: "mallionaire",
    body: "best game EVERR",
  };
  return request(app)
    .post("/api/reviews/9999/comments")
    .send(newComment)
    .expect(404)
    .then(({ body: { msg } }) => {
      expect(msg).toBe("Path not found");
    });
});
