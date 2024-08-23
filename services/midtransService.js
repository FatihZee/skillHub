const midtransClient = require('midtrans-client');
const { Order } = require('../models');

const midtrans = new midtransClient.Snap({
  isProduction: false, // Set ke true jika menggunakan environment production
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

class MidtransService {
  static async createPayment(orderId) {
    const order = await Order.findByPk(orderId);

    if (!order) {
      throw new Error('Order not found');
    }

    // Ambil harga dari kolom price
    const totalPrice = order.price;

    // Parameter untuk membuat transaksi di Midtrans
    const parameter = {
      transaction_details: {
        order_id: order.orderId, // Ambil orderId dari kolom orderId
        gross_amount: totalPrice, // Ambil harga dari kolom price
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        email: order.buyer.email,
        first_name: order.buyer.name,
      },
    };

    try {
      const response = await midtrans.createTransaction(parameter);
      order.paymentUrl = response.redirect_url;
      await order.save();
      return response;
    } catch (error) {
      throw new Error('Midtrans payment creation failed');
    }
  }

  static async handleNotification(notification) {
    const { order_id, transaction_status } = notification;

    const order = await Order.findOne({ where: { orderId: order_id } });

    if (!order) {
      throw new Error('Order not found');
    }

    if (transaction_status === 'settlement') {
      order.status = 'success';
    } else if (transaction_status === 'pending') {
      order.status = 'pending';
    } else if (transaction_status === 'cancel') {
      order.status = 'failed';
    } else if (transaction_status === 'deny') {
      order.status = 'failed';
    }

    await order.save();
  }
}

module.exports = MidtransService;
