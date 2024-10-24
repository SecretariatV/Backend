import mongoose from "mongoose";
import app from "../app";
import request from "supertest";

describe("Auth API endpoints", () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe("POST /api/v1/auth/register", () => {
    it("should register a new user", async () => {
      const response = await request(app)
        .post("/api/v1/auth/register")
        .send({ email: "test@example.com", password: "passwrd123" });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("User created successfully!");
    });

    it("should return an error if the user already exists", async () => {
      await request(app)
        .post("/api/v1/auth/register")
        .send({ email: "existing@example.com", password: "password123" });

      const response = await request(app)
        .post("/api/v1/auth/register")
        .send({ email: "existing@example.com", password: "password123" });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("User already exists.");
    });
  });

  describe("POST /api/v1/auth/login", () => {
    it("should log in an existing user", async () => {
      await request(app)
        .post("/api/v1/auth/register")
        .send({ email: "testlogin@example.com", password: "password123" });

      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({ email: "testlogin@example.com", password: "password123" });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Logged in successfully!");
      expect(response.headers["set-cookie"]).toBeDefined();
    });

    it("should return error for invalid credentials", async () => {
      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({ email: "nonexisting@example.com", password: "wrongpassword" });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe(
        "No user with the email: nonexisting@example.com"
      );
    });
  });
});
