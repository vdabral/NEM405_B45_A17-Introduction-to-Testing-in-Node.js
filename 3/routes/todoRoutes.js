const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

// Create a new todo
router.post("/", async (req, res) => {
  try {
    const todo = await todoController.createTodo(req.body);
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await todoController.getAllTodos();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a todo by ID
router.put("/:id", async (req, res) => {
  try {
    const updated = await todoController.updateTodo(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Todo not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a todo by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await todoController.deleteTodo(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Todo not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
