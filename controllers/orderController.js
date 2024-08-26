const OrderService = require("../services/orderService");

class OrderController {
  async createOrder(req, res) {
    try {
      const { serviceId, priceOption } = req.body;
      const buyerId = req.user.id; // Assuming user ID is stored in req.user.id

      const { order, paymentUrl } = await OrderService.createOrder({
        serviceId,
        buyerId,
        priceOption,
      });

      res.status(201).json({
        order,
        paymentUrl,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getOrder(req, res) {
    try {
      const { id } = req.params;
      const order = await OrderService.getOrderById(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllOrders(req, res) {
    try {
      const orders = await OrderService.getAllOrders();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new OrderController();
