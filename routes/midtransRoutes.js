const express = require("express");
const router = express.Router();
const MidtransController = require("../controllers/midtransController");

// Route to handle Midtrans webhook notifications
router.post("/midtrans-webhook", MidtransController.handleWebhook);

module.exports = router;
