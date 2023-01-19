const app = require("../app.js");
const data = require("../db/data/test-data");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(data);
});
test("GET /api : status 200 and returns data from endpoint.JSON", () => {
  return request(app)
    .get("/api")
    .expect(200)
    .then(({ body: { data } }) => {
      expect(data).toEqual({
        "GET /api": {
          description: "Returns a json showing all endpoints",
        },
        "GET /api/categories": {
          description: "Returns an array of objects containing all categories",
          queries: [],
          exampleResponse: {
            categories: [
              {
                slug: "euro game",
                description: "Abstact games that involve little luck",
              },
              {
                slug: "social deduction",
                description:
                  "Players attempt to uncover each others hidden role",
              },
              {
                slug: "dexterity",
                description: "Games involving physical skill",
              },
              {
                slug: "childrens games",
                description: "Games suitable for children",
              },
            ],
          },
        },
        "GET /api/users": {
          description:
            "responds with an array of users objects, having the following properties: username, name, avatar_url",
          queries: [],
          exampleResponse: [
            {
              username: "mallionaire",
              name: "haz",
              avatar_url:
                "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
            },
            {
              username: "philippaclaire9",
              name: "philippa",
              avatar_url:
                "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
            },
            {
              username: "bainesface",
              name: "sarah",
              avatar_url:
                "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
            },
            {
              username: "dav3rid",
              name: "dave",
              avatar_url:
                "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            },
          ],
        },

        "GET /api/reviews": {
          description:
            "Returns an array showing all arrays, or all arrays from given queries",
          queries: ["category", "sort_by", "order"],
          exampleResponse: {
            reviews: [
              {
                review_id: 3,
                title: "Ultimate Werewolf",
                category: "social deduction",
                designer: "Akihisa Okui",
                owner: "bainesface",
                review_body: "We couldnt find the werewolf!",
                review_img_url:
                  "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?w=700&h=700",
                created_at: "2021-01-18T10:01:41.251Z",
                votes: 5,
                comment_count: 3,
              },
            ],
          },
        },

        "GET /api/reviews/:review_id": {
          description: "Returns a review from given :review_id",
          queries: [],
          exampleResponse: {
            reviews: {
              review_id: 1,
              title: "Agricola",
              category: "euro game",
              designer: "Uwe Rosenberg",
              owner: "mallionaire",
              review_body: "Farmyard fun!",
              review_img_url:
                "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=700&h=700",
              created_at: "2021-01-18T10:00:20.514Z",
              votes: 1,
              comment_count: 0,
            },
          },
        },
        "GET /api/reviews/:review_id/comments": {
          description:
            "Returns array of objects (comments) refering to review at :review_id",
          queries: [],
          exampleResponse: {
            comments: [
              {
                comment_id: 5,
                body: "Now this is a story all about how, board games turned my life upside down",
                review_id: 2,
                author: "mallionaire",
                votes: 13,
                created_at: "2021-01-18T10:24:05.410Z",
              },
              {
                comment_id: 1,
                body: "I loved this game too!",
                review_id: 2,
                author: "bainesface",
                votes: 16,
                created_at: "2017-11-22T12:43:33.389Z",
              },
              {
                comment_id: 4,
                body: "EPIC board game!",
                review_id: 2,
                author: "bainesface",
                votes: 16,
                created_at: "2017-11-22T12:36:03.389Z",
              },
            ],
          },
        },

        "POST /api/reviews/:review_id/comments": {
          description:
            "accepts an object containing: Username, body then returns the posted comment",
          queries: [],
          exampleResponse: {
            comment: {
              body: "Cool game bro",
              comment_id: 7,
              votes: 0,
              author: "dav3rid",
              review_id: 1,
              created_at: "2023-01-19T10:05:05.477Z",
            },
          },
        },
        "PATCH /api/reviews/:review_id": {
          description:
            "Increases or decreases the the votes key, dependent upon inc_votes which is sent to server in the request.",
          queries: [],
          exampleResponse: {
            reviews: {
              title: "Jenga",
              designer: "Leslie Scott",
              owner: "philippaclaire9",
              review_img_url:
                "https://images.pexels.com/photos/4473494/pexels-photo-4473494.jpeg?w=700&h=700",
              review_body: "Fiddly fun for all the family",
              category: "dexterity",
              created_at: "2021-01-18T10:01:41.251Z",
              votes: 15,
              review_id: 2,
            },
          },
        },
        "DELETE /api/comments/:comment_id": {
          description:
            "deletes comment by :comment_id in path, responds with no content",
          queries: [],
          exampleResponse: [],
        },
      });
    });
});
test("GET /api/categories : status:200 and response message", () => {
  return request(app).get("/api/categories").expect(200);
});

test("GET /api/categories : returns an array of objects with a slug and desc", () => {
  return request(app)
    .get("/api/categories")
    .expect(200)
    .then((res) => {
      expect(res.body.categories.length).toBeGreaterThan(1);
      res.body.categories.forEach((category) => {
        expect(typeof category).toBe("object");
        expect(category.hasOwnProperty("description")).toBe(true);
        expect(category.hasOwnProperty("slug")).toBe(true);
      });
    });
});

test("GET /api/users : returns an array of objects with a username, name, avatar_url", () => {
  return request(app)
    .get("/api/users")
    .expect(200)
    .then((res) => {
      res.body.users.forEach((user) => {
        expect(typeof user).toBe("object");
        expect(user.hasOwnProperty("username")).toBe(true);
        expect(user.hasOwnProperty("name")).toBe(true);
        expect(user.hasOwnProperty("avatar_url")).toBe(true);
      });
      expect(res.body.users.length).toBeGreaterThan(1);
    });
});

test("status:200 and response message", () => {
  return request(app).get("/api/reviews").expect(200);
});

test("GET /api/reviews : returns an array of objects with an owner, title, review_id, category, review_img_url, created_at, votes, designer", () => {
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
test("GET /api/reviews?query accepts a sort_by query, which sorts by title", () => {
  return request(app)
    .get("/api/reviews?sort_by=title")
    .expect(200)
    .then(({ body: { reviews } }) => {
      expect(reviews).toBeSortedBy("title", { descending: true, coerce: true });
    });
});
test("accepts query and returns the reviews in default order (date and descending)", () => {
  return request(app)
    .get(`/api/reviews`)
    .expect(200)
    .then(({ body: { reviews } }) => {
      expect(reviews).toBeSortedBy("created_at", {
        descending: true,
      });
    });
});
test("accept a category and return games in that category", () => {
  return request(app)
    .get(`/api/reviews?category=social+deduction`)
    .expect(200)
    .then(({ body: { reviews } }) => {
      expect(reviews).toBeSortedBy("created_at", { descending: true });
    });
});
test("accept a valid category where there are no reviews in category, returns empty array", () => {
  return request(app)
    .get(`/api/reviews?category=children's+games`)
    .expect(200)
    .then(({ body: { reviews } }) => {
      expect(reviews).toEqual([]);
    });
});
test("return reviews ordered by title in ascending order", () => {
  return request(app)
    .get(`/api/reviews?sort_by=designer&&order=asc`)
    .expect(200)
    .then(({ body: { reviews } }) => {
      expect(reviews).toBeSortedBy("designer", { descending: false });
    });
});
test("testing for a status 400, user enters non-valid sort_by query", () => {
  return request(app)
    .get("/api/reviews?sort_by=badrequest")
    .expect(400)
    .then(({ body }) => {
      expect(body.msg).toBe("Bad request");
    });
});
test("testing for 400 status when order query is invalid", () => {
  return request(app)
    .get(`/api/reviews?sort_by=title&&order=phone`)
    .expect(400)
    .then(({ body }) => {
      expect(body.msg).toBe("Bad request");
    });
});
test("testing for a 404 when a category column is invalid", () => {
  return request(app)
    .get(`/api/reviews?category=nothing`)
    .expect(404)
    .then(({ body }) => {
      expect(body.msg).toBe("Category not found");
    });
});

test("GET /api/reviews/review_id: returns an object with the correct review_id from the endpoint with an owner, title, review_id, category, review_img_url, created_at, votes, designer", () => {
  return request(app)
    .get("/api/reviews/1")
    .expect(200)
    .then((res) => {
      const review = res.body.review[0];
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
test("Testing comment_count field which has been added to get review by review_id", () => {
  return request(app)
    .get("/api/reviews/2")
    .expect(200)
    .then((res) => {
      const review = res.body.review[0];
      expect(review.comment_count).toEqual(3);
    });
});

test("GET /api/reviews/:review_id/comments: status:200 and response message", () => {
  return request(app).get("/api/reviews").expect(200);
});

test("GET /api/reviews/:review_id/comments: returns an array of comments with comment_id, votes, created_at, author, body, review_id", () => {
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

test("Error Testing:  Testing for a 404 error with a route that does not exist", () => {
  return request(app)
    .get("/api/404fault")
    .expect(404)
    .then(({ body }) => {
      expect(body.msg).toBe("Path not found");
    });
});
test("It should return a 400 error", () => {
  return request(app)
    .get("/api/reviews/bad-request")
    .expect(400)
    .then(({ body }) => {
      expect(body.msg).toBe("Bad request");
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
test("POST /api/reviews/:review_id/comments status:201 and returns newComment", () => {
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
test("Status 404 Path not found, needs valid username from users.js file.", () => {
  const newComment = {
    username: "NotAUser",
    body: "Hello",
  };
  return request(app)
    .post("/api/reviews/1/comments")
    .send(newComment)
    .expect(404)
    .then(({ body: { msg } }) => {
      expect(msg).toBe("Path not found");
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
test("Status 404 path not found, if review_id entered the wrong data type", () => {
  const newComment = {
    username: "mallionaire",
    body: "best game EVERR",
  };
  return request(app)
    .patch("/api/reviews/nan/comments")
    .send(newComment)
    .expect(404)
    .then(({ body: { msg } }) => {
      expect(msg).toBe("Path not found");
    });
});

test("Patch, /api/reviews/:review_id : status 200 ok, returns an object with updated votes field as an object. Current votes = 5, expecting 15 after adding 10 from inc_votes", () => {
  const updateVote = {
    inc_votes: 10,
  };
  return request(app)
    .patch("/api/reviews/2")
    .send(updateVote)
    .expect(200)
    .then(({ body }) => {
      expect(body.review).toEqual({
        title: "Jenga",
        designer: "Leslie Scott",
        owner: "philippaclaire9",
        review_img_url:
          "https://images.pexels.com/photos/4473494/pexels-photo-4473494.jpeg?w=700&h=700",
        review_body: "Fiddly fun for all the family",
        category: "dexterity",
        created_at: "2021-01-18T10:01:41.251Z",
        votes: 15,
        review_id: 2,
      });
    });
});
test("Patch, /api/reviews/:review_id : status 200 ok, returns an object with updated votes which are currently 5 and are now expecting to be 3 field as an object. When entering negative numbers to inc_votes", () => {
  const updateVote = {
    inc_votes: -3,
  };
  return request(app)
    .patch("/api/reviews/2")
    .send(updateVote)
    .expect(200)
    .then(({ body }) => {
      expect(body.review).toEqual({
        title: "Jenga",
        designer: "Leslie Scott",
        owner: "philippaclaire9",
        review_img_url:
          "https://images.pexels.com/photos/4473494/pexels-photo-4473494.jpeg?w=700&h=700",
        review_body: "Fiddly fun for all the family",
        category: "dexterity",
        created_at: "2021-01-18T10:01:41.251Z",
        votes: 2,
        review_id: 2,
      });
    });
});
test("Status 404 path not found, if review_id entered is valid but does not exist", () => {
  const updateVote = {
    inc_votes: 10,
  };
  return request(app)
    .patch("/api/reviews/9999")
    .send(updateVote)
    .expect(404)
    .then(({ body: { msg } }) => {
      expect(msg).toBe("Path not found");
    });
});
test("Status 400 path not found, if review_id entered the wrong data type", () => {
  const updatedVote = {
    inc_votes: 15,
  };
  return request(app)
    .patch("/api/reviews/nan")
    .send(updatedVote)
    .expect(400)
    .then(({ body: { msg } }) => {
      expect(msg).toBe("Bad request");
    });
});
test("Status 400 Bad request, needs valid new comment object with inc_votes key", () => {
  const updateVote = {};
  return request(app)
    .post("/api/reviews/1/comments")
    .send(updateVote)
    .expect(400)
    .then(({ body: { msg } }) => {
      expect(msg).toBe("Bad request");
    });
});
test("Status 400 Bad request, needs valid new comment with correct data type", () => {
  const updateVote = { inc_votes: "sausages" };
  return request(app)
    .post("/api/reviews/1/comments")
    .send(updateVote)
    .expect(400)
    .then(({ body: { msg } }) => {
      expect(msg).toBe("Bad request");
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

    username: "NotAUser",
    body: "",

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

test("Delete /api/comments/:comment_id Status 204 by comment_id", () => {
  return request(app)
    .delete("/api/comments/2")
    .expect(204)
    .then(({ body }) => {
      expect(body).toEqual({});
    });
});

test("status 400 Bad request when comment_id is a string, not a number", () => {
  return request(app)
    .delete("/api/comments/notacomment")
    .expect(400)
    .then(({ body: { msg } }) => {
      expect(msg).toBe("Bad request");
    });
});
test("status 400 Bad request when comment_id does not exist", () => {
  return request(app)
    .delete("/api/comments/9999")
    .expect(404)
    .then(({ body: { msg } }) => {
      expect(msg).toBe("Path not found");
    });
});
