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

describe.only("app", () => {
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
            expect(typeof res.body.categories[0]).toBe("object");
            expect(res.body.categories[0].hasOwnProperty("description")).toBe(
              true
            );
            expect(Array.isArray(res.body.categories)).toBe(true);
          });
      });
    });
  });
});
