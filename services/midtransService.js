const midtransClient = require("midtrans-client");
const { Order, User } = require("../models");

class MidtransService {
  constructor() {
    this.client = new midtransClient.Snap({
      isProduction: false, // Set ke true untuk produksi
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY,
    });
  }

  async createPayment(uniqueOrderId, amount) {
    // Cari order dengan orderId yang sesuai dengan uniqueOrderId
    const order = await Order.findOne({
      where: { orderId: uniqueOrderId }, // Cari orderId berdasarkan uniqueOrderId
      include: {
        model: User,
        as: "buyer",
        attributes: ["name", "email", "phone"], // Sertakan nama, email, dan telepon pembeli
      },
    });

    if (!order) {
      throw new Error("Order tidak ditemukan");
    }

    const { name, email, phone } = order.buyer;

    const parameter = {
      transaction_details: {
        order_id: uniqueOrderId, // Gunakan orderId unik
        gross_amount: amount, // Harga dari model Order
      },
      customer_details: {
        first_name: name,
        email: email,
        phone: phone,
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
      const response = await this.client.transaction.status(order_id);
      return response.signature_key === signature_key;
    } catch (error) {
      console.error('Error verifying signature:', error);
      return false;
    }
  }
}

module.exports = new MidtransService();
