// routes/skillRoutes.js
const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');

/**
 * @swagger
 * tags:
 *   name: Skills
 *   description: API untuk mengelola keterampilan
 */

/**
 * @swagger
 * /skills:
 *   get:
 *     summary: Mendapatkan semua keterampilan
 *     tags: [Skills]
 *     responses:
 *       200:
 *         description: Daftar semua keterampilan
 *       500:
 *         description: Terjadi kesalahan
 */
router.get('/skills', skillController.getAllSkills);

/**
 * @swagger
 * /skills/{id}:
 *   get:
 *     summary: Mendapatkan keterampilan berdasarkan ID
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID keterampilan
 *     responses:
 *       200:
 *         description: Keterampilan ditemukan
 *       404:
 *         description: Keterampilan tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan
 */
router.get('/skills/:id', skillController.getSkillById);

/**
 * @swagger
 * /skills:
 *   post:
 *     summary: Membuat keterampilan baru
 *     tags: [Skills]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Keterampilan berhasil dibuat
 *       500:
 *         description: Terjadi kesalahan
 */
router.post('/skills', skillController.createSkill);

/**
 * @swagger
 * /skills/{id}:
 *   put:
 *     summary: Mengupdate keterampilan berdasarkan ID
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID keterampilan
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Keterampilan berhasil diupdate
 *       404:
 *         description: Keterampilan tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan
 */
router.put('/skills/:id', skillController.updateSkill);

/**
 * @swagger
 * /skills/{id}:
 *   delete:
 *     summary: Menghapus keterampilan berdasarkan ID
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID keterampilan
 *     responses:
 *       204:
 *         description: Keterampilan berhasil dihapus
 *       404:
 *         description: Keterampilan tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan
 */
router.delete('/skills/:id', skillController.deleteSkill);

module.exports = router;
