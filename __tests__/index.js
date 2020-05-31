const supertest = require("supertest");
const server = require("../api/server");
const db = require("../database/config");

afterEach(async () => {
  await db("diners").truncate();
  await db("operators").truncate();
});

describe("diner register", () => {
  it("POST /register", async () => {
    const data = { username: "ghayes", password: 123 };
    supertest(server)
      .post("/diners/auth/register")
      .send(data)
      .then((res) => expect(res.statusCode).toBe(200))
      .catch((err) => console.log(err));
  });
});
describe("diner auth test", () => {
  it("POST /register", async () => {
    const res = await supertest(server).get("/diners/auth/register");
    expect(res.type).toBe("text/html");
  });
});

describe("diner register then login", () => {
  it("POST /login", async () => {
    const data = { username: "ghayes", password: 123 };
    supertest(server)
      .post("/diners/auth/register")
      .send(data)
      .then((res) => {
        supertest(server)
          .post("/diners/auth/login")
          .send(data)
          .then(async (res) => {
            await console.log("new res", res);
            await expect(res.statusCode).toBe(200);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });
});

describe("operator register", () => {
  it("POST /register", async () => {
    const data = { username: "ghayes1", password: 123 };
    supertest(server)
      .post("/operators/auth/register")
      .send(data)
      .then((res) => expect(res.statusCode).toBe(200))
      .catch((err) => console.log(err));
  });
});
describe("operator auth test", () => {
  it("POST /register", async () => {
    const res = await supertest(server).get("/operators/auth/register");
    expect(res.type).toBe("text/html");
  });
});

describe("operator register then login", () => {
  it("POST /login", async () => {
    const data = { username: "ghayes1", password: 123 };
    supertest(server)
      .post("/operators/auth/register")
      .send(data)
      .then((res) => {
        supertest(server)
          .post("/operators/auth/login")
          .send(data)
          .then(async (res) => {
            await console.log("new res", res);
            await expect(res.statusCode).toBe(200);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });
});
