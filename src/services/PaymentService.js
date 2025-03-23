import paymentProvider from "./paymentProvider/index.js";
class PaymentService {
  constructor() {
    this.paymentGateway = paymentProvider;
  }

  async intiateCardPayment(data) {
    try {
      const payment = await this.paymentGateway.initiateCardPayment(data);
      return payment;
    } catch (error) {
      throw error;
    }
  }
  async verifyPayment(tx_ref) {
    try {
      const payment = await this.paymentGateway.verifyPayment({ id: tx_ref });
      return payment;
    } catch (error) {
      throw error;
    }
  }
  async approvePayment(provider_ref) {
    try {
      const payment = await this.paymentGateway.approvePayment(provider_ref);
      return payment;
    } catch (error) {
      throw error;
    }
  }
}
export default new PaymentService();
