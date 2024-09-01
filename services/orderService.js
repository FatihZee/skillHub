const { Order, Service, User } = require("../models");
const MidtransService = require("./midtransService");
const nodemailer = require("nodemailer");

class OrderService {
  async createOrder(orderData) {
    const { serviceId, buyerId, priceOption } = orderData;

    // Cari service untuk mendapatkan harga yang sesuai
    const service = await Service.findByPk(serviceId);
    if (!service) {
      throw new Error("Service tidak ditemukan");
    }

    let price;
    let priceColumn;
    switch (priceOption) {
      case "basic":
        price = service.basicPrice;
        priceColumn = "basicPrice";
        break;
      case "standard":
        price = service.standardPrice;
        priceColumn = "standardPrice";
        break;
      case "premium":
        price = service.premiumPrice;
        priceColumn = "premiumPrice";
        break;
      default:
        throw new Error("Opsi harga tidak valid");
    }

    // Generate orderId unik
    const uniqueOrderId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Buat order dengan uniqueOrderId
    const order = await Order.create({
      orderId: uniqueOrderId, // Gunakan uniqueOrderId
      serviceId,
      buyerId,
      sellerId: service.userId,
      priceOption: priceColumn,
      price,
    });

    // Buat URL pembayaran dengan uniqueOrderId
    const paymentUrl = await MidtransService.createPayment(uniqueOrderId, price);

    // Kirim email ke pembeli
    await this.sendOrderEmail(buyerId, order, service, paymentUrl);

    return { order, paymentUrl };
  }

  async sendOrderEmail(buyerId, order, service, paymentUrl) {
    const buyer = await User.findByPk(buyerId);

    if (!buyer) {
      throw new Error("Pembeli tidak ditemukan");
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: buyer.email,
      subject: "Konfirmasi Pemesanan",
      html: `
        <p>Dear ${buyer.name},</p>
        <p>Terima kasih atas pesanan Anda. Berikut adalah detail pesanan Anda:</p>
        <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse;">
          <tr>
            <th>Order ID</th>
            <th>Nama Service</th>
            <th>Opsi Harga</th>
            <th>Total Harga</th>
          </tr>
          <tr>
            <td>${order.orderId}</td>
            <td>${service.title}</td>
            <td>${order.priceOption}</td>
            <td>${order.price}</td>
          </tr>
        </table>
        <p>Anda bisa melakukan pembayaran dengan mengklik link berikut:</p>
        <p><a href="${paymentUrl}" target="_blank">${paymentUrl}</a></p>
        <p>Best regards,<br>Your Company</p>
      `,
    };

    await transporter.sendMail(mailOptions);
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
