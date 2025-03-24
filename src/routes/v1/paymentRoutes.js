import express from "express";
import PaymentController from "../../controllers/PaymentController.js";
import validateRequest from "../../middlewares/validateRequest.js";
import { paymentSchema } from "../../validations/paymentValidations.js";

const router = express.Router();

router.post("/verify", (req, res) => PaymentController.verifyPayment(req, res));
router.post("/approve", (req, res) =>
  PaymentController.approvePayment(req, res)
);
router.get("/:id", (req, res) => PaymentController.verifyPayment(req, res));

router.use(validateRequest(paymentSchema));
router.post("/", (req, res) => PaymentController.initiateCardPayment(req, res));

// router.post("/", (req, res) => PaymentController);

export default router;
