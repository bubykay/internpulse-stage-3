import Fluttwewave from "flutterwave-node-v3";
import crypto from "crypto";
import env from "../../config/env.js";
import { handleFlutterwaveProviderException } from "../../utils/index.js";
class FlutterwaveProvider {
  #flutterwave;
  constructor() {
    this.#flutterwave = new Fluttwewave(
      env.providers.flutterwave.publicKey,
      env.providers.flutterwave.secretKey
    );
  }

  initiateCardPayment = async (data) => {
    try {
      const tx_ref = `IC-${crypto.randomBytes(5).toString("hex")}`;
      const response = await this.#flutterwave.Charge.card({
        ...data,
        enckey: env.providers.flutterwave.encryptionKey,
        currency: "NGN",
        tx_ref,
        card_number: "5531886652142950",
        redirect_url: `https://katobum.com/txn/${tx_ref}`,
        expiry_month: "09",
        expiry_year: "32",
        authorization: {
          mode: "pin",
          pin: "3310",
        },
        cvv: "564",
      });
      return response;
    } catch (error) {
      return handleFlutterwaveProviderException(error);
    }
  };

  verifyPayment = async (tx_ref) => {
    try {
      const response = await this.#flutterwave.Transaction.verify({
        id: parseInt(tx_ref),
      });
      return response;
    } catch (error) {
      return handleFlutterwaveProviderException(error);
    }
  };

  approvePayment = async ({ provider_ref, otp }) => {
    try {
      const response = await this.#flutterwave.Charge.validate({
        otp: otp,
        flw_ref: provider_ref,
      });
      return response;
    } catch (error) {
      return handleFlutterwaveProviderException(error);
    }
  };
}

export default new FlutterwaveProvider();
