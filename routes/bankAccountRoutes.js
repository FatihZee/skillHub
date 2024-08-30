const express = require('express');
const BankAccountController = require('../controllers/bankAccountController');
const authenticateToken = require('../middlewares/authenticateToken');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: BankAccounts
 *   description: API untuk menghubungkan User ke Bank yang sudah ada
 */

/**
 * @swagger
 * /bankaccounts:
 *   post:
 *     tags:
 *       - BankAccounts
 *     summary: Create a new bank account
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Bank account data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bankId:
 *                 type: integer
 *               accountNumber:
 *                 type: string
 *     responses:
 *       201:
 *         description: Bank account created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/bankaccounts', authenticateToken, BankAccountController.createBankAccount);

/**
 * @swagger
 * /bankaccounts/{id}:
 *   get:
 *     tags:
 *       - BankAccounts
 *     summary: Get a bank account by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Bank account data
 *       404:
 *         description: Bank account not found
 *       500:
 *         description: Internal server error
 */
router.get('/bankaccounts/:id', authenticateToken, BankAccountController.getBankAccountById);

/**
 * @swagger
 * /bankaccounts:
 *   get:
 *     tags:
 *       - BankAccounts
 *     summary: Get all bank accounts
 *     responses:
 *       200:
 *         description: List of all bank accounts
 *       500:
 *         description: Internal server error
 */
router.get('/bankaccounts', BankAccountController.getAllBankAccounts);

/**
 * @swagger
 * /bankaccounts/{id}:
 *   put:
 *     tags:
 *       - BankAccounts
 *     summary: Update a bank account by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Bank account data to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bankId:
 *                 type: integer
 *               accountNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: Bank account updated successfully
 *       404:
 *         description: Bank account not found
 *       500:
 *         description: Internal server error
 */
router.put('/bankaccounts/:id', authenticateToken, BankAccountController.updateBankAccount);

/**
 * @swagger
 * /bankaccounts/{id}:
 *   delete:
 *     tags:
 *       - BankAccounts
 *     summary: Delete a bank account by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Bank account deleted successfully
 *       404:
 *         description: Bank account not found
 *       500:
 *         description: Internal server error
 */
router.delete('/bankaccounts/:id', authenticateToken, BankAccountController.deleteBankAccount);

module.exports = router;
