const express = require("express");
const app = express();
const todoRouter = require("./routes/todo");

app.use(express.json());
app.use("/api/todos", todoRouter);

module.exports = app;
