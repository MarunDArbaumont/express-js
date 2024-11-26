const express = require("express");
const router = express.Router();

router
  .route("/:id")
  .get((req, res) => {
    res.send(`Get todo with id ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`update todo with id ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`delete todo with id ${req.params.id}`);
  })
  .post((req, res) => {
    res.send(`post todo with id ${req.params.id}`);
  });

const todo = [
  {
    id: 1,
    content: "content",
    completed: false,
  },
  {
    id: 2,
    content: "yo",
    completed: true,
  },
];
router.param("id", (req, res, next, id) => {
  req.todo = todo[id];
  next();
});

module.export = router;
