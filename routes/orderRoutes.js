const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/orderController");
const authenticateToken = require("../middlewares/authenticateToken");


// Route to create a new order
router.post("/orders", authenticateToken, OrderController.createOrder);

// Route to get an order by ID
router.get("/orders/:id", OrderController.getOrder);

// Route to get all orders
router.get("/orders", OrderController.getAllOrders);

module.exports = router;
