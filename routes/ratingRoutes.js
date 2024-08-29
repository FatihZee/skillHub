// routes/ratings.js
const express = require('express');
const router = express.Router();
const RatingController = require('../controllers/RatingController');
const authenticateToken = require('../middlewares/authenticateToken');

/**
 * @swagger
 * tags:
 *   name: Ratings
 *   description: API untuk mengelola rating pengguna
 */

/**
 * @swagger
 * /ratings:
 *   post:
 *     summary: Menambahkan rating
 *     tags: [Ratings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ratingValue:
 *                 type: integer
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: Great user!
 *               targetUserId:
 *                 type: integer
 *                 example: 7
 *     responses:
 *       201:
 *         description: Rating berhasil ditambahkan
 *       500:
 *         description: Terjadi kesalahan server
 */
router.post('/ratings', authenticateToken, RatingController.addRating);

/**
 * @swagger
 * /ratings/user/{userId}:
 *   get:
 *     summary: Mendapatkan rating berdasarkan ID user
 *     tags: [Ratings]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID user yang akan dicari ratingnya
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Daftar rating untuk user yang diberikan
 *       500:
 *         description: Terjadi kesalahan server
 */
router.get('/ratings/user/:userId', RatingController.getRatingsByUserId);

/**
 * @swagger
 * /ratings/user/{userId}/average:
 *   get:
 *     summary: Mendapatkan rata-rata rating berdasarkan ID user
 *     tags: [Ratings]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID user yang akan dicari rata-rata ratingnya
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rata-rata rating untuk user yang diberikan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 averageRating:
 *                   type: number
 *                   format: float
 *                   example: 4.5
 *       500:
 *         description: Terjadi kesalahan server
 */
router.get('/ratings/user/:userId/average', RatingController.getAverageRatingByUserId);

module.exports = router;
