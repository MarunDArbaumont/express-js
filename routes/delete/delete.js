const express = require("express");
const router = express.Router();

// Delete a specific todo
router.delete("/:id", (req, res) => {
  console.log("Delete a specific todo");
  req.params.id;
  res.send(`get user with id ${eq.params.id}`);
});
