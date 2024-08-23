const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/orderController");
const authenticateToken = require("../middlewares/authenticateToken");

/**
 * @swagger
 * tags:
 *  name: Orders
 *  description: API untuk mengelola order
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Mengambil semua order
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Daftar semua order
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.get("/orders", OrderController.getAllOrders);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Mengambil order berdasarkan ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID dari order
 *     responses:
 *       200:
 *         description: Order ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order tidak ditemukan
 */
router.get("/orders/:id", OrderController.getOrderById);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Membuat order baru
 *     security:
 *       - bearerAuth: []
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               serviceId:
 *                 type: integer
 *               priceOption:
 *                 type: string
 *                 enum: [basicPrice, standardPrice, premiumPrice]
 *     responses:
 *       201:
 *         description: Order berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Request tidak valid
 */
router.post("/orders", authenticateToken, OrderController.createOrder);

/**
 * @swagger
 * /orders/{id}/status:
 *   put:
 *     summary: Mengupdate status order
 *     security:
 *       - bearerAuth: []
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID dari order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order berhasil diupdate
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Request tidak valid
 *       404:
 *         description: Order tidak ditemukan
 */
router.put(
  "/orders/:id/status",
  authenticateToken,
  OrderController.updateOrderStatus
);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Menghapus order berdasarkan ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID dari order
 *     responses:
 *       204:
 *         description: Order berhasil dihapus
 *       404:
 *         description: Order tidak ditemukan
 */
router.delete("/orders/:id", authenticateToken, OrderController.deleteOrder);

/**
 * @swagger
 * /orders/incoming:
 *   get:
 *     summary: Mengambil semua incoming orders untuk seller
 *     security:
 *       - bearerAuth: []
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Daftar semua incoming orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.get("/orders/incoming", authenticateToken, OrderController.getIncomingOrders);

/**
 * @swagger
 * /orders/outgoing:
 *   get:
 *     summary: Mengambil semua outgoing orders untuk buyer
 *     security:
 *       - bearerAuth: []
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Daftar semua outgoing orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.get("/orders/outgoing", authenticateToken, OrderController.getOutgoingOrders);

module.exports = router;
