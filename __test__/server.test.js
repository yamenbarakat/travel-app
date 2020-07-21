const req = require("supertest");
const app = require("../src/server/app");

test("It should response the GET method", () => {
    return req(app)
    .get("/")
    .then(res => {
        expect(res.statusCode).toBe(200);
    });
});


