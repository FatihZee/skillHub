const MidtransService = require('../services/midtransService');

class MidtransController {
  // Endpoint untuk membuat pembayaran
  static async createPayment(req, res) {
    try {
      const { orderId } = req.params;
      const response = await MidtransService.createPayment(orderId);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Endpoint untuk menangani notifikasi dari Midtrans
  static async handleNotification(req, res) {
    try {
      const notification = req.body;
      await MidtransService.handleNotification(notification);
      res.status(200).json({ message: 'Notification handled successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = MidtransController;
