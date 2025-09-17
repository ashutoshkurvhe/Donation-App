// config/payment.js
const Stripe = require("stripe");
const logger = require("../utils/logger");

const validatePaymentAmount = (amount) => {
  if (!amount || amount <= 0) {
    throw new Error("Invalid payment amount");
  }
  // Stripe expects amount in smallest currency unit (cents)
  return Math.round(amount * 100);
};

class PaymentService {
  constructor() {
    if (!process.env.STRIPE_SECRET_KEY) {
      logger.error("❌ STRIPE_SECRET_KEY is missing in environment variables.");
      process.exit(1);
    }

    try {
      this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY.trim(), {
        apiVersion: "2023-10-16",
      });
      logger.info("✅ Stripe initialized successfully");
    } catch (error) {
      logger.error("Failed to initialize Stripe:", error);
      process.exit(1);
    }
  }

  async createPaymentIntent(amount, currency = "usd") {
    try {
      const validatedAmount = validatePaymentAmount(amount);
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: validatedAmount,
        currency,
      });
      return paymentIntent;
    } catch (error) {
      logger.error("Payment intent creation failed:", error);
      throw error;
    }
  }
}

module.exports = new PaymentService();
