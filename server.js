const express = require("express");
const mongoose = require("mongoose");
const Todo = require("./models/todo");
const port = 3000;
const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect("mongodb://mongo:27017/todos", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}
connectDB();

// Routes

// GET all todos
app.get("/todo", async (req, res) => {
  try {
    const todos = await Todo.find({ is_complete: false });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET todo based on ID
app.get("/todo/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found!" });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: "Invalid ID format" });
  }
});

// POST create new todo
app.post("/todo", async (req, res) => {
  try {
    const todo = new Todo({
      title: req.body.title,
      description: req.body.description,
      is_complete: req.body.is_complete || false,
      due_date: req.body.due_date || new Date(),
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: "Invalid data format" });
  }
});

// UPDATE todo
app.patch("/todo/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found!" });
    }

    // Update fields if provided
    if (req.body.title) todo.title = req.body.title;
    if (req.body.description) todo.description = req.body.description;
    if (typeof req.body.is_complete !== "undefined") {
      todo.is_complete = req.body.is_complete;
    }
    if (req.body.due_date) todo.due_date = req.body.due_date;

    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: "Invalid request or ID format" });
  }
});

// DELETE todo
app.delete("/todo/:id", async (req, res) => {
  try {
    const result = await Todo.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: "Todo not found!" });
    }
    res.status(204).send(); // No content
  } catch (error) {
    res.status(400).json({ error: "Invalid ID format" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
