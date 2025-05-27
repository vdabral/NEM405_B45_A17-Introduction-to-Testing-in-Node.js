const Todo = require("../models/todo");

// Create a new Todo
exports.createTodo = async (data) => {
  const todo = new Todo(data);
  return await todo.save();
};

// Get all Todos
exports.getAllTodos = async () => {
  return await Todo.find().sort({ createdAt: -1 });
};

// Get single Todo by ID
exports.getTodoById = async (id) => {
  return await Todo.findById(id);
};

// Update Todo by ID
exports.updateTodo = async (id, updateData) => {
  return await Todo.findByIdAndUpdate(id, updateData, { new: true });
};

// Delete Todo by ID
exports.deleteTodo = async (id) => {
  return await Todo.findByIdAndDelete(id);
};
