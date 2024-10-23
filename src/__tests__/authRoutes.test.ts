import app from "../app";
import request from "supertest";

describe("Auth API endpoints", () => {
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
});
