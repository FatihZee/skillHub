"use strict";
const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/orderController");
const authenticate = require("../middlewares/authenticateToken");

router.post("/orders", authenticate, OrderController.createOrder);
router.get("/orders/:id", authenticate, OrderController.getOrderById);
router.get("/orders", OrderController.getAllOrders);
router.delete("/orders/:id", authenticate, OrderController.deleteOrder);
router.post("/midtrans-notification", OrderController.handleMidtransNotification);

module.exports = router;
