import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import request from "supertest";
import mongoose from "mongoose";
import app from "./server";

beforeAll(async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/todo-test");
  } catch (error) {
    console.error("MongoDB connection failed", error);
  }
});

// Clean up the database after each test
afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("API /todo", () => {
  let todoId;

  it("should create a new todo", async () => {
    const res = await request(app).post("/todo").send({
      title: "Nouveau Todo",
      description: "Description du todo",
      is_complete: false,
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("title", "Nouveau Todo");
    todoId = res.body._id;
  });

  it("should get all todos", async () => {
    const res = await request(app).get("/todo");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should get a todo by ID", async () => {
    const res = await request(app).get(`/todo/${todoId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("_id", todoId);
  });

  it("should update a todo", async () => {
    const res = await request(app).patch(`/todo/${todoId}`).send({
      is_complete: true,
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("is_complete", true);
  });

  it("should delete a todo", async () => {
    const res = await request(app).delete(`/todo/${todoId}`);
    expect(res.status).toBe(204);
  });
});
