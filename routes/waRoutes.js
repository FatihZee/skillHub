const express = require('express');
const router = express.Router();
const waController = require('../controllers/waController');
const authenticateToken = require("../middlewares/authenticateToken");

/**
 * @swagger
 * tags:
 *   name: WhatsApp
 *   description: API endpoints related to WhatsApp links
 */

/**
 * @swagger
 * /api/{id}/whatsapp-link:
 *   get:
 *     summary: Get WhatsApp link for user
 *     tags: [WhatsApp]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to get the WhatsApp link for
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response with WhatsApp link
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 waLink:
 *                   type: string
 *                   example: https://wa.me/621234567890?text=Hello%20John%2C%0A%0AMy%20name%20is%20Alice.%20I%20found%20your%20profile%20on%20our%20platform%20and%20would%20like%20to%20connect%20with%20you%20regarding%20your%20services%20and%20expertise.%0A%0ALooking%20forward%20to%20hearing%20from%20you%21%0A%0ABest%20regards%2C%0AAlice
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id/whatsapp-link', authenticateToken, waController.getWhatsAppLink);

module.exports = router;
