const express = require('express');
const router = express.Router();
const skillSwapController = require('../controllers/skillSwapController');
const authenticateToken = require("../middlewares/authenticateToken");

// Create a new skill swap
router.post('/skillSwap', authenticateToken, skillSwapController.createSkillSwap);

// Request a skill swap
router.post('/skillSwap/:skillSwapId/request', authenticateToken, skillSwapController.requestSkillSwap);

// Update skill swap status (accept or reject)
router.put('/skillSwap/:skillSwapId', authenticateToken, skillSwapController.updateSkillSwapStatus);

// Get all skill swaps for a specific user
router.get('/skillSwap/user/:userId', authenticateToken, skillSwapController.getSkillSwapsForUser);

// Get all skill swaps offered by a specific user
router.get('/skillSwap/offered/:userId', authenticateToken, skillSwapController.getSkillSwapsOfferedByUser);

// Get all skill swaps
router.get('/skillSwap', skillSwapController.getAllSkillSwaps);

module.exports = router;
