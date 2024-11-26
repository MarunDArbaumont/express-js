const express = require("express");
const app = express();

app.set("view engine", "ejs");

// Print all the todos
app.get("/", (req, res) => {
  console.log("Print all the todos");
  //   res.send("All todos");
  res.send(todo);
});

const todoRouter = require("./routes/todo");

app.use("/todo", todoRouter);

app.listen(3000);
