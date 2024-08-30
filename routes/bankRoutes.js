const express = require('express');
const BankController = require('../controllers/bankController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Banks
 *   description: API untuk daftar bank yang sudah ada
 */

/**
 * @swagger
 * /banks:
 *   post:
 *     summary: Create a new bank
 *     tags: [Banks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nama
 *               - kode
 *             properties:
 *               nama:
 *                 type: string
 *               kode:
 *                 type: string
 *     responses:
 *       201:
 *         description: The bank was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bank'
 *       500:
 *         description: Some server error
 */
router.post('/banks', BankController.createBank);

/**
 * @swagger
 * /banks/{id}:
 *   get:
 *     summary: Get a bank by ID
 *     tags: [Banks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The bank ID
 *     responses:
 *       200:
 *         description: The bank data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bank'
 *       404:
 *         description: Bank not found
 *       500:
 *         description: Some server error
 */
router.get('/banks/:id', BankController.getBankById);

/**
 * @swagger
 * /banks:
 *   get:
 *     summary: Get all banks
 *     tags: [Banks]
 *     responses:
 *       200:
 *         description: The list of the banks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bank'
 *       500:
 *         description: Some server error
 */
router.get('/banks', BankController.getAllBanks);

/**
 * @swagger
 * /banks/{id}:
 *   put:
 *     summary: Update a bank by ID
 *     tags: [Banks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The bank ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *               kode:
 *                 type: string
 *     responses:
 *       200:
 *         description: The bank was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bank'
 *       404:
 *         description: Bank not found
 *       500:
 *         description: Some server error
 */
router.put('/banks/:id', BankController.updateBank);

/**
 * @swagger
 * /banks/{id}:
 *   delete:
 *     summary: Delete a bank by ID
 *     tags: [Banks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The bank ID
 *     responses:
 *       200:
 *         description: Bank deleted successfully
 *       404:
 *         description: Bank not found
 *       500:
 *         description: Some server error
 */
router.delete('/banks/:id', BankController.deleteBank);

module.exports = router;
