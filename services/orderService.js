const { Order, Service, User } = require("../models");

class OrderService {
  static async createOrder({ serviceId, buyerId, priceOption }) {
    const service = await Service.findByPk(serviceId);

    if (!service) {
      throw new Error('Service not found');
    }

    const sellerId = service.userId; // Seller adalah user yang mem-post service

    let price;
    switch (priceOption) {
      case 'basicPrice':
        price = service.basicPrice;
        break;
      case 'standardPrice':
        price = service.standardPrice;
        break;
      case 'premiumPrice':
        price = service.premiumPrice;
        break;
      default:
        throw new Error('Invalid price option');
    }

    const order = await Order.create({
      serviceId,
      buyerId,
      sellerId,
      priceOption,
      price,
      status: "pending",
    });

    return order;
  }

  static async getOrderById(orderId) {
    return await Order.findByPk(orderId, {
      include: [
        { model: Service, as: "service" },
        { model: User, as: "buyer" },
        { model: User, as: "seller" },
      ],
    });
  }

  static async getAllOrders() {
    return await Order.findAll({
      include: [
        { model: Service, as: "service" },
        { model: User, as: "buyer" },
        { model: User, as: "seller" },
      ],
    });
  }

  static async updateOrderStatus(orderId, status) {
    const order = await Order.findByPk(orderId);
    if (order) {
      order.status = status;
      await order.save();
      return order;
    }
    throw new Error("Order not found");
  }

  static async deleteOrder(orderId) {
    const order = await Order.findByPk(orderId);
    if (order) {
      await order.destroy();
      return true;
    }
    return false;
  }

  static async getOrdersByBuyer(buyerId) {
    return await Order.findAll({
      where: { buyerId },
      include: [
        { model: Service, as: "service" },
        { model: User, as: "buyer" },
        { model: User, as: "seller" },
      ],
    });
  }

  static async getOrdersBySeller(sellerId) {
    return await Order.findAll({
      where: { sellerId },
      include: [
        { model: Service, as: "service" },
        { model: User, as: "buyer" },
        { model: User, as: "seller" },
      ],
    });
  }
}

module.exports = OrderService;
