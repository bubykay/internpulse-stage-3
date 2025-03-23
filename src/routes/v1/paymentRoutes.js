import express from "express";
import PaymentController from "../../controllers/PaymentController.js";

const router = express.Router();

router.post("/initiate", (req, res) =>
  PaymentController.initiateCardPayment(req, res)
);
router.post("/verify", (req, res) => PaymentController.verifyPayment(req, res));
router.post("/approve", (req, res) =>
  PaymentController.approvePayment(req, res)
);

export default router;
