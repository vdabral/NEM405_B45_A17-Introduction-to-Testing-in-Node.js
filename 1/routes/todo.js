const express = require("express");
const router = express.Router();

let todos = [];
let id = 1;

// Create To-Do
router.post("/", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title required" });
  const newTodo = { id: id++, title };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

router.get("/", (req, res) => {
  res.status(200).json(todos);
});

router.put("/:id", (req, res) => {
  const todo = todos.find((t) => t.id == req.params.id);
  if (!todo) return res.status(404).json({ error: "Not found" });
  todo.title = req.body.title || todo.title;
  res.status(200).json(todo);
});

router.delete("/:id", (req, res) => {
  const index = todos.findIndex((t) => t.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "Not found" });
  todos.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
