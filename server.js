const express = require("express");
const app = express();
const Todo = require("./models/todo");

// GET all todos
app.get("/todo", async (req, res) => {
  const todos = await Todo.find({ is_complete: false });
  res.send(todos);
});

// GET todo based on ID
app.get("/todo/:id", async (req, res) => {
  const todo = await Todo.findOne({ _id: req.params.id });
  res.send(todo);
});

// POST create new todo
app.post("/todo", async (req, res) => {
  console.log(req.body);
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    is_complete: req.body.is_complete || false,
    due_date: req.body.due_date || new Date(),
  });
  await todo.save();
  res.send(todo);
});

// UPDATE todo
app.patch("/todo/:id", async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id });

    if (req.body.title) {
      todo.title = req.body.title;
    }
    if (req.body.description) {
      todo.description = req.body.description;
    }
    if (req.body.is_complete) {
      todo.is_complete = req.body.is_complete;
    }
    if (req.body.due_date) {
      todo.due_date = req.body.due_date;
    }
    await todo.save();
    res.send(todo);
  } catch {
    res.status(404);
    res.send({ error: "Todo does not exist!" });
  }
});

// DELETE todo
app.delete("/todo/:id", async (req, res) => {
  try {
    await Todo.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Todo does not exist!" });
  }
});

app.listen(3000);
