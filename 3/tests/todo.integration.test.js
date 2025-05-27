require("dotenv").config();
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app"); // Your Express app instance
const Todo = require("../models/todo"); // Your Mongoose model

// Connect to test DB before all tests
beforeAll(async () => {
  await mongoose.connect(process.env.TEST_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Clean up after each test
afterEach(async () => {
  await Todo.deleteMany({});
});

// Disconnect after all tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe("To-Do API Integration Tests", () => {
  test("POST /todos - should create a new todo", async () => {
    const todoData = { title: "Integration Test", completed: false };

    const response = await request(app)
      .post("/todos")
      .send(todoData)
      .expect(201);

    expect(response.body.title).toBe(todoData.title);
    expect(response.body.completed).toBe(false);
  });

  test("GET /todos - should return list of todos", async () => {
    await Todo.create({ title: "Sample ToDo", completed: false });

    const response = await request(app).get("/todos").expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test("PUT /todos/:id - should update a todo", async () => {
    const todo = await Todo.create({ title: "Old Title", completed: false });

    const response = await request(app)
      .put(`/todos/${todo._id}`)
      .send({ title: "Updated Title", completed: true })
      .expect(200);

    expect(response.body.title).toBe("Updated Title");
    expect(response.body.completed).toBe(true);
  });

  test("DELETE /todos/:id - should delete a todo", async () => {
    const todo = await Todo.create({ title: "Delete Me" });

    await request(app).delete(`/todos/${todo._id}`).expect(204);

    const found = await Todo.findById(todo._id);
    expect(found).toBeNull();
  });
});
