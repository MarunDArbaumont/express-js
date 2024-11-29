const express = require("express");
const router = express.Router();

router.param("id", (req, res, next, id) => {
  req.todo = todo[id];
  next();
});

module.export = router;
