const request = require("supertest");
const app = require("../app");
jest.mock("../models/todoModel"); // Mock DB

const Todo = require("../models/todoModel");

describe("To-Do API - With Mocks", () => {
  afterEach(() => jest.clearAllMocks());

  test("Create Todo - success", async () => {
    Todo.create.mockResolvedValue({ id: 1, title: "Test Todo" });

    const res = await request(app).post("/todos").send({ title: "Test Todo" });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Test Todo");
  });

  test("Create Todo - missing title", async () => {
    const res = await request(app).post("/todos").send({});
    expect(res.status).toBe(400);
  });

  test("Update non-existent Todo - should return 404", async () => {
    Todo.update.mockRejectedValue(new Error("Todo not found"));

    const res = await request(app).put("/todos/99").send({ title: "Updated" });
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Todo not found");
  });

  test("Delete Todo - success", async () => {
    Todo.delete.mockResolvedValue({ id: 1, title: "Deleted" });

    const res = await request(app).delete("/todos/1");
    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Deleted");
  });

  test("Get All Todos", async () => {
    Todo.findAll.mockResolvedValue([{ id: 1, title: "Test" }]);
    const res = await request(app).get("/todos");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });
});
