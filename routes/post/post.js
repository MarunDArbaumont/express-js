const express = require("express");
const router = express.Router();

// Add a specific todo
router.post("/add", (req, res) => {
  console.log("Add new todo");
  req.push(todo);
});
