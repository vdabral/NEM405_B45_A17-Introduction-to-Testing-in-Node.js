const Todo = require("../models/todo");
const todoController = require("../controllers/todoController"); // your controller

describe("Jest Spy on complex DB update", () => {
  test("calls findByIdAndUpdate once when updating a todo", async () => {
    const fakeId = "507f1f77bcf86cd799439011";
    const fakeUpdate = { title: "Spied Update", completed: true };

    const updateSpy = jest
      .spyOn(Todo, "findByIdAndUpdate")
      .mockResolvedValue({ _id: fakeId, ...fakeUpdate });

    await todoController.updateTodo(fakeId, fakeUpdate);

    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toHaveBeenCalledWith(fakeId, fakeUpdate, {
      new: true,
    });

    updateSpy.mockRestore();
  });
});
