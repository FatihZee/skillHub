const express = require("express");
const router = express.Router();
const portfolioController = require("../controllers/portfolioController");
const authenticateToken = require("../middlewares/authenticateToken.js");

/**
 * @swagger
 * tags:
 *   name: Portfolios
 *   description: API untuk mengelola portfolios
 */

/**
 * @swagger
 * /portfolios:
 *   get:
 *     summary: Ambil semua portfolios
 *     tags: [Portfolios]
 *     responses:
 *       200:
 *         description: Daftar portfolios berhasil diambil.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Portfolio'
 */
router.get("/portfolios", portfolioController.getAllPortfolios);

/**
 * @swagger
 * /portfolios/{id}:
 *   get:
 *     summary: Ambil portfolio berdasarkan ID
 *     tags: [Portfolios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID dari portfolio yang akan diambil
 *     responses:
 *       200:
 *         description: Portfolio berhasil diambil.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Portfolio'
 *       404:
 *         description: Portfolio tidak ditemukan.
 */
router.get("/portfolios/:id", portfolioController.getPortfolioById);

/**
 * @swagger
 * /portfolios:
 *   post:
 *     summary: Buat portfolio baru
 *     tags: [Portfolios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - description
 *               - image
 *             properties:
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Portfolio berhasil dibuat.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Portfolio'
 *       500:
 *         description: Terjadi kesalahan saat membuat portfolio.
 */
router.post(
  "/portfolios",
  authenticateToken,
  portfolioController.createPortfolio
);

/**
 * @swagger
 * /portfolios/{id}:
 *   put:
 *     summary: Update portfolio berdasarkan ID
 *     tags: [Portfolios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID dari portfolio yang akan diupdate
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Portfolio berhasil diupdate.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Portfolio'
 *       404:
 *         description: Portfolio tidak ditemukan.
 *       500:
 *         description: Terjadi kesalahan saat mengupdate portfolio.
 */
router.put(
  "/portfolios/:id",
  authenticateToken,
  portfolioController.updatePortfolio
);

/**
 * @swagger
 * /portfolios/{id}:
 *   delete:
 *     summary: Hapus portfolio berdasarkan ID
 *     tags: [Portfolios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID dari portfolio yang akan dihapus
 *     responses:
 *       204:
 *         description: Portfolio berhasil dihapus.
 *       404:
 *         description: Portfolio tidak ditemukan.
 *       500:
 *         description: Terjadi kesalahan saat menghapus portfolio.
 */
router.delete(
  "/portfolios/:id",
  authenticateToken,
  portfolioController.deletePortfolio
);

module.exports = router;
