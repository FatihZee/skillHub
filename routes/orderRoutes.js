const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/orderController");
const authenticateToken = require("../middlewares/authenticateToken");

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API untuk mengelola order
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     description: Creates a new order and generates a payment URL.
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               serviceId:
 *                 type: integer
 *                 description: The ID of the service being ordered.
 *               priceOption:
 *                 type: string
 *                 description: The price option for the service. Can be "basic", "standard", or "premium".
 *                 enum:
 *                   - basic
 *                   - standard
 *                   - premium
 *             required:
 *               - serviceId
 *               - priceOption
 *     responses:
 *       '201':
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 order:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The ID of the order
 *                     serviceId:
 *                       type: integer
 *                       description: The ID of the service
 *                     buyerId:
 *                       type: integer
 *                       description: The ID of the buyer
 *                     sellerId:
 *                       type: integer
 *                       description: The ID of the seller
 *                     priceOption:
 *                       type: string
 *                       description: The price option selected
 *                     price:
 *                       type: number
 *                       format: float
 *                       description: The price of the order
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: The date and time when the order was created
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: The date and time when the order was last updated
 *                 paymentUrl:
 *                   type: string
 *                   description: The URL for payment
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
router.post("/orders", authenticateToken, OrderController.createOrder);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     description: Retrieves details of a specific order by ID.
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the order to retrieve
 *     responses:
 *       '200':
 *         description: Details of the order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the order
 *                 serviceId:
 *                   type: integer
 *                   description: The ID of the service
 *                 buyerId:
 *                   type: integer
 *                   description: The ID of the buyer
 *                 sellerId:
 *                   type: integer
 *                   description: The ID of the seller
 *                 priceOption:
 *                   type: string
 *                   description: The price option selected
 *                 price:
 *                   type: number
 *                   format: float
 *                   description: The price of the order
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the order was created
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the order was last updated
 *       '404':
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Not found message
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
router.get("/orders/:id", OrderController.getOrder);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     description: Retrieves a list of all orders.
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the order
 *                   serviceId:
 *                     type: integer
 *                     description: The ID of the service
 *                   buyerId:
 *                     type: integer
 *                     description: The ID of the buyer
 *                   sellerId:
 *                     type: integer
 *                     description: The ID of the seller
 *                   priceOption:
 *                     type: string
 *                     description: The price option selected
 *                   price:
 *                     type: number
 *                     format: float
 *                     description: The price of the order
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time when the order was created
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time when the order was last updated
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
router.get("/orders", OrderController.getAllOrders);

module.exports = router;
