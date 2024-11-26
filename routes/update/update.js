const express = require("express");
const router = express.Router();

// Upate a specific todo
router.put("/:id", (req, res) => {
  console.log("Update a specific todo");
});
