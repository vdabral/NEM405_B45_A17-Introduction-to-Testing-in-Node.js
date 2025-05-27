const isEven = require("./isEven");

test("should return true for even numbers", () => {
  expect(isEven(4)).toBe(true);
});
