import request from "supertest";
import app from "../app";
import PaymentController from "../controllers/PaymentController";

describe("POST /api/v1/payment/initiate", () => {
  it("should return 400 if email is missing in the request body", async () => {
    const response = await request(app)
      .post("/api/v1/payment/initiate")
      .send({ amount: 1000 });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", ["email is required"]);
  });
  it("should return 400 if amount is missing in the request body", async () => {
    const response = await request(app)
      .post("/api/v1/payment/initiate")
      .send({ email: "test@example.com" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", ["amount is required"]);
  });

  it("should return 400 if email is invalid", async () => {
    const response = await request(app)
      .post("/api/v1/payment/initiate")
      .send({ email: "invalid-email", amount: 1000 });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", ["Invalid email format"]);
  });

  it("should return 200 and initiate payment if request body is valid", async () => {
    const response = await request(app)
      .post("/api/v1/payment/initiate")
      .send({ email: "test@example.com", amount: 1000 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Charge initiated");
    expect(response.body).toHaveProperty("data.data");
    expect(response.body).toHaveProperty("data.statusCode");
  });

  it("should return 500 if there is a server error", async () => {
    jest
      .spyOn(PaymentController, "initiateCardPayment")
      .mockImplementationOnce(() => {
        throw new Error("Server error");
      });

    const response = await request(app)
      .post("/api/v1/payment/initiate")
      .send({ email: "test@example.com", amount: 1000 });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty(
      "error.message",
      "Internal Server Error"
    );
  });
});
