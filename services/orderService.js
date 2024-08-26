const { Order, Service, User } = require("../models");
const midtransClient = require("midtrans-client");

class OrderService {
  static async createOrder(data, buyerId) {
    try {
      const { serviceId, priceOption } = data;
      const service = await Service.findByPk(serviceId, {
        include: [{ model: User, as: "user" }],
      });

      if (!service) {
        throw new Error("Service not found");
      }

      const price = service[priceOption];
      if (!price) {
        throw new Error("Invalid price option");
      }

      // Generate orderId before creating the order
      const orderId = `order-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

      // Mengambil informasi buyer berdasarkan buyerId
      const buyer = await User.findByPk(buyerId);

      if (!buyer) {
        throw new Error("Buyer not found");
      }

      const order = await Order.create({
        orderId, // Include the generated orderId here
        serviceId,
        sellerId: service.userId,
        buyerId, // Use the buyerId from the parameter
        priceOption,
        price,
        status: "pending",
      });

      const midtrans = new midtransClient.Snap({
        isProduction: false,
        serverKey: "SB-Mid-server-dZmgryP9BGzDYfrJYo6I_uBF",
        clientKey: "SB-Mid-client-Nn0htVUW17Ebbeqz",
      });

      const transaction = await midtrans.createTransaction({
        transaction_details: {
          order_id: orderId,
          gross_amount: price,
        },
        customer_details: {
          email: buyer.email, // Menggunakan email dari buyer
          phone: buyer.phone, // Menggunakan phone dari buyer
        },
      });

      return { order: order.toJSON(), paymentUrl: transaction.redirect_url };
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  }

  static async getOrderById(orderId) {
    try {
      const order = await Order.findOne({
        where: { orderId },
        include: [{ model: Service, as: "service" }],
      });

      if (!order) {
        throw new Error("Order not found");
      }

      return order;
    } catch (error) {
      console.error("Error retrieving order:", error);
      throw error;
    }
  }

  static async getAllOrders() {
    try {
      const orders = await Order.findAll({
        include: [{ model: Service, as: "service" }],
      });
      return orders;
    } catch (error) {
      console.error("Error retrieving orders:", error);
      throw error;
    }
  }

  static async deleteOrder(orderId) {
    try {
      const order = await Order.findOne({ where: { orderId } });
      if (!order) {
        throw new Error("Order not found");
      }

      await order.destroy();
      return order;
    } catch (error) {
      console.error("Error deleting order:", error);
      throw error;
    }
  }

  static async handleMidtransNotification(notification) {
    try {
      const { order_id, transaction_status } = notification;

      // Ambil order dari database
      const order = await Order.findOne({ where: { orderId: order_id } });
      if (!order) throw new Error("Order not found");

      // Tentukan status baru berdasarkan transaction_status
      let newStatus;
      switch (transaction_status) {
        case "capture":
        case "settlement":
          newStatus = "settled";
          break;
        case "pending":
          newStatus = "pending";
          break;
        case "deny":
        case "expire":
        case "cancel":
          newStatus = "failed";
          break;
        default:
          newStatus = "unknown";
      }

      // Periksa apakah status baru berbeda dari status yang ada
      if (order.status !== newStatus) {
        // Perbarui order jika status baru berbeda
        await order.update({ status: newStatus });
        console.log(
          `Order ${order.orderId} updated successfully to status: ${newStatus}`
        );
      } else {
        console.log(`Order ${order.orderId} already has status: ${newStatus}`);
      }

      // Menampilkan semua komponen dalam order setelah pembaruan
      console.log("Order details after update:");
      console.log(`ID: ${order.id}`);
      console.log(`Order ID: ${order.orderId}`);
      console.log(`Service ID: ${order.serviceId}`);
      console.log(`Buyer ID: ${order.buyerId}`);
      console.log(`Seller ID: ${order.sellerId}`);
      console.log(`Price Option: ${order.priceOption}`);
      console.log(`Price: ${order.price}`);
      console.log(`Status: ${order.status}`);

      return order;
    } catch (error) {
      console.error("Error handling Midtrans notification:", error);
      throw error;
    }
  }
}

module.exports = OrderService;
