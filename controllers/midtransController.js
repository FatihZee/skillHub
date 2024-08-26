const MidtransService = require("../services/midtransService");
const { Order } = require("../models");

class MidtransController {
  async handleWebhook(req, res) {
    try {
      console.log("Received webhook:", req.body); // Log the received notification

      const notification = req.body;

      // Verify the notification signature
      const isValidSignature = await MidtransService.verifySignature(notification);
      if (!isValidSignature) {
        console.log("Invalid signature");
        return res.status(400).json({ message: "Invalid signature" });
      }

      // Handle the notification based on the status
      const orderId = notification.order_id;
      const transactionStatus = notification.transaction_status;
      const order = await Order.findByPk(orderId);

      if (!order) {
        console.log("Order not found");
        return res.status(404).json({ message: "Order not found" });
      }

      if (transactionStatus === "settlement") {
        order.status = "completed";
      } else if (transactionStatus === "pending") {
        order.status = "pending";
      } else if (transactionStatus === "failed") {
        order.status = "failed";
      }

      await order.save();

      // Respond to Midtrans
      res.status(200).json({ message: "Notification received" });
    } catch (error) {
      console.error('Error handling webhook:', error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new MidtransController();
