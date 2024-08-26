const midtransClient = require("midtrans-client");

class MidtransService {
  constructor() {
    this.client = new midtransClient.Snap({
      isProduction: false, // Set to true for production
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY,
    });
  }

  async createPayment(orderId, amount) {
    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: amount, // Price from the Order model
      },
      credit_card: {
        secure: true,
      },
    };

    const transaction = await this.client.createTransaction(parameter);
    return transaction.redirect_url;
  }

  async verifySignature(notification) {
    try {
      const { order_id, transaction_status, gross_amount, signature_key } = notification;
      // Check if the notification signature is valid
      const response = await this.client.transaction.status(order_id);
      return response.signature_key === signature_key;
    } catch (error) {
      console.error('Error verifying signature:', error);
      return false;
    }
  }
}

module.exports = new MidtransService();
