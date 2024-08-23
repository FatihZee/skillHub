const OrderService = require('../services/orderService');

class OrderController {
  static async createOrder(req, res) {
    try {
      const { serviceId, priceOption } = req.body;
      const buyerId = req.user.id; // Asumsikan user yang login diambil dari token

      const order = await OrderService.createOrder({
        serviceId,
        buyerId,
        priceOption,
      });

      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getOrderById(req, res) {
    try {
      const { id } = req.params;
      const order = await OrderService.getOrderById(id);

      if (order) {
        res.status(200).json(order);
      } else {
        res.status(404).json({ error: 'Order not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllOrders(req, res) {
    try {
      const orders = await OrderService.getAllOrders();
      res.status(200).json(orders);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateOrderStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const order = await OrderService.updateOrderStatus(id, status);

      res.status(200).json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteOrder(req, res) {
    try {
      const { id } = req.params;

      const success = await OrderService.deleteOrder(id);

      if (success) {
        res.status(204).json();
      } else {
        res.status(404).json({ error: 'Order not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getIncomingOrders(req, res) {
    try {
      const sellerId = req.user.id;
      const orders = await OrderService.getOrdersBySeller(sellerId);
      res.status(200).json(orders);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getOutgoingOrders(req, res) {
    try {
      const buyerId = req.user.id;
      const orders = await OrderService.getOrdersByBuyer(buyerId);
      res.status(200).json(orders);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = OrderController;
