const request = require("supertest");
const app = require("../app");

describe("To-Do API", () => {
  it("should create a new to-do item", async () => {
    const res = await request(app)
      .post("/api/todos")
      .send({ title: "Test Task" });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Test Task");
  });

  it("should fetch all to-do items", async () => {
    const res = await request(app).get("/api/todos");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should update a to-do item", async () => {
    const create = await request(app)
      .post("/api/todos")
      .send({ title: "Old Task" });
    const id = create.body.id;
    const update = await request(app)
      .put(`/api/todos/${id}`)
      .send({ title: "Updated Task" });
    expect(update.status).toBe(200);
    expect(update.body.title).toBe("Updated Task");
  });

  it("should delete a to-do item", async () => {
    const create = await request(app)
      .post("/api/todos")
      .send({ title: "Task to delete" });
    const id = create.body.id;
    const del = await request(app).delete(`/api/todos/${id}`);
    expect(del.status).toBe(204);
  });

  it("should handle missing title in POST", async () => {
    const res = await request(app).post("/api/todos").send({});
    expect(res.status).toBe(400);
  });

  it("should handle invalid id on update", async () => {
    const res = await request(app)
      .put("/api/todos/999")
      .send({ title: "Nothing" });
    expect(res.status).toBe(404);
  });
});
