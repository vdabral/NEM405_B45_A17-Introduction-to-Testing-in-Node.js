const Todo = require("../models/todo");
const todoController = require("../controllers/todoController"); // your controller

describe("Jest Spy on complex DB update", () => {
  test("calls findByIdAndUpdate once when updating a todo", async () => {
    const fakeReq = {
      params: { id: "507f1f77bcf86cd799439011" },
      body: { title: "Spied Update", completed: true },
    };
    const fakeRes = { json: jest.fn() };

    const updateSpy = jest
      .spyOn(Todo, "findByIdAndUpdate")
      .mockResolvedValue({ _id: fakeReq.params.id, ...fakeReq.body });

    await todoController.updateTodo(fakeReq, fakeRes);

    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toHaveBeenCalledWith(fakeReq.params.id, fakeReq.body, {
      new: true,
    });
    expect(fakeRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Spied Update",
        completed: true,
      })
    );

    updateSpy.mockRestore();
  });
});
