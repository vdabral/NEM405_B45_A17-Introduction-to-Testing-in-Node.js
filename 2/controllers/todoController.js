const Todo = require("../models/todoModel");

exports.getAllTodos = async (req, res) => {
  const todos = await Todo.findAll();
  res.status(200).json(todos);
};

exports.createTodo = async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title required" });

  const newTodo = await Todo.create(title);
  res.status(201).json(newTodo);
};

exports.updateTodo = async (req, res) => {
  try {
    const id = +req.params.id;
    const { title } = req.body;
    const updated = await Todo.update(id, title);
    res.status(200).json(updated);
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const id = +req.params.id;
    const deleted = await Todo.delete(id);
    res.status(200).json(deleted);
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};
