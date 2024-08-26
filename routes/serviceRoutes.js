const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");
const authenticateToken = require("../middlewares/authenticateToken.js");

/**
 * @swagger
 * tags:
 *   name: Services
 *   description: API untuk mengelola layanan
 */

/**
 * @swagger
 * /services:
 *   post:
 *     summary: Membuat layanan baru
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               isAvailable:
 *                 type: boolean
 *               skillId:
 *                 type: integer
 *               basicPrice:
 *                 type: number
 *               standardPrice:
 *                 type: number
 *               premiumPrice:
 *                 type: number
 *     responses:
 *       201:
 *         description: Layanan berhasil dibuat
 *       500:
 *         description: Terjadi kesalahan
 */
router.post("/services", authenticateToken, serviceController.createService);

/**
 * @swagger
 * /services:
 *   get:
 *     summary: Mendapatkan semua layanan
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: Daftar semua layanan
 *       500:
 *         description: Terjadi kesalahan
 */
router.get("/services", serviceController.getAllServices);

/**
 * @swagger
 * /services/{id}:
 *   get:
 *     summary: Mendapatkan layanan berdasarkan ID
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID layanan
 *     responses:
 *       200:
 *         description: Layanan ditemukan
 *       404:
 *         description: Layanan tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan
 */
router.get(
  "/services/:id",
  authenticateToken,
  serviceController.getServiceById
);

/**
 * @swagger
 * /services/{id}:
 *   put:
 *     summary: Mengupdate layanan berdasarkan ID
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID layanan
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               isAvailable:
 *                 type: boolean
 *               skillId:
 *                 type: integer
 *               basicPrice:
 *                 type: number
 *               standardPrice:
 *                 type: number
 *               premiumPrice:
 *                 type: number
 *     responses:
 *       200:
 *         description: Layanan berhasil diupdate
 *       404:
 *         description: Layanan tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan
 */
router.put("/services/:id", authenticateToken, serviceController.updateService);

/**
 * @swagger
 * /services/{id}:
 *   delete:
 *     summary: Menghapus layanan berdasarkan ID
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID layanan
 *     responses:
 *       204:
 *         description: Layanan berhasil dihapus
 *       404:
 *         description: Layanan tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan
 */
router.delete(
  "/services/:id",
  authenticateToken,
  serviceController.deleteService
);

module.exports = router;
