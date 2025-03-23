import paymentService from "../services/PaymentService.js";
class PaymentController {
  async initiateCardPayment(req, res) {
    const { amount, email } = req.body;
    const payment = await paymentService.intiateCardPayment({ amount, email });
    res.json(payment);
  }
  async verifyPayment(req, res) {
    const { tx_reference } = req.body;
    const payment = await paymentService.verifyPayment(tx_reference);
    res.json(payment);
  }
  async approvePayment(req, res) {
    const { provider_ref, otp } = req.body;
    const payment = await paymentService.approvePayment({ provider_ref, otp });
    res.json(payment);
  }
}
export default new PaymentController();
