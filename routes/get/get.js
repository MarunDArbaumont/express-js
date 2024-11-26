const express = require("express");
const router = express.Router();

// Get a specific todo
router.get("/todo/:id", (req, res) => {
  console.log("Get a specific todo");
  req.params.id;
  res.send(`get user with id ${req.params.id}`);
});
