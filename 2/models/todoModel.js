let todos = [];
let idCounter = 1;

const Todo = {
  findAll: async () => todos,
  create: async (title) => {
    const newTodo = { id: idCounter++, title };
    todos.push(newTodo);
    return newTodo;
  },
  update: async (id, title) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      todo.title = title;
      return todo;
    }
    throw new Error("Todo not found");
  },
  delete: async (id) => {
    const index = todos.findIndex((t) => t.id === id);
    if (index === -1) throw new Error("Todo not found");
    return todos.splice(index, 1)[0];
  },
};

module.exports = Todo;
