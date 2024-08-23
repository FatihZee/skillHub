const express = require("express");
const router = express.Router();
const MidtransController = require("../controllers/midtransController");

/**
 * @swagger
 * tags:
 *  name: Payment
 *  description: API for payment from midtrans
 */

/**
 * @swagger
 * /midtrans/payment/{orderId}:
 *   post:
 *     summary: Create a payment for an order
 *     tags:
 *       - Payment
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         description: ID of the order to create payment for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 redirect_url:
 *                   type: string
 *                   description: The URL to redirect for payment
 *       400:
 *         description: Error creating payment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
router.post("/payment/:orderId", MidtransController.createPayment);

/**
 * @swagger
 * /midtrans/notification:
 *   post:
 *     summary: Handle payment notification from Midtrans
 *     tags:
 *       - Payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order_id:
 *                 type: string
 *                 description: The ID of the order
 *               transaction_status:
 *                 type: string
 *                 description: The status of the transaction
 *     responses:
 *       200:
 *         description: Notification handled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Error handling notification
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
router.post("/notification", MidtransController.handleNotification);

module.exports = router;
