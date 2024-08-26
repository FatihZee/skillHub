"use strict";
const OrderService = require("../services/orderService");

class OrderController {
  static async createOrder(req, res) {
    try {
      const order = await OrderService.createOrder(req.body, req.user.id);
      return res.status(201).json({
        message: "Order created successfully",
        order: order.order,
        paymentUrl: order.paymentUrl,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async getOrderById(req, res) {
    try {
      const order = await OrderService.getOrderById(req.params.id);
      return res.status(200).json(order);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  static async getAllOrders(req, res) {
    try {
      const orders = await OrderService.getAllOrders();
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async deleteOrder(req, res) {
    try {
      const order = await OrderService.deleteOrder(req.params.id);
      return res.status(200).json({
        message: "Order deleted successfully",
        order,
      });
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  static async handleMidtransNotification(req, res) {
    try {
      const notification = req.body;

      // Log the entire notification body for debugging purposes
      console.log('Received Midtrans notification:', notification);

      await OrderService.handleMidtransNotification(notification);
      return res.status(200).json({ message: "Notification processed" });
    } catch (error) {
      console.error('Error processing Midtrans notification:', error.message);
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = OrderController;
