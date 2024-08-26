const { Order, Service } = require("../models");
const MidtransService = require("./midtransService");

class OrderService {
  async createOrder(orderData) {
    const { serviceId, buyerId, priceOption } = orderData;

    // Find the service to get the appropriate price
    const service = await Service.findByPk(serviceId);
    if (!service) {
      throw new Error("Service not found");
    }

    let price;
    switch (priceOption) {
      case "basic":
        price = service.basicPrice;
        break;
      case "standard":
        price = service.standardPrice;
        break;
      case "premium":
        price = service.premiumPrice;
        break;
      default:
        throw new Error("Invalid price option");
    }

    // Create the order
    const order = await Order.create({
      serviceId,
      buyerId,
      sellerId: service.userId, // Seller ID from the service
      priceOption,
      price,
    });

    // Create a payment URL
    const paymentUrl = await MidtransService.createPayment(order.id, price);

    return { order, paymentUrl };
  }

  async getOrderById(orderId) {
    return await Order.findByPk(orderId, {
      include: ["buyer", "seller", "service"],
    });
  }

  async getAllOrders() {
    return await Order.findAll({
      include: ["buyer", "seller", "service"],
    });
  }
}

module.exports = new OrderService();
