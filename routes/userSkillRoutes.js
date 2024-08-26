const express = require("express");
const router = express.Router();
const userSkillController = require("../controllers/userSkillController");
const authenticateToken = require("../middlewares/authenticateToken.js");

/**
 * @swagger
 * tags:
 *  name: UserSkills
 *  description: API untuk mengelola keterampilan ke pengguna
 */
/**
 * @swagger
 * /user-skills:
 *   post:
 *     summary: Menambahkan keterampilan ke pengguna
 *     tags: [UserSkills]
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               skillId:
 *                 type: integer
 *                 description: ID keterampilan yang ingin ditambahkan
 *     responses:
 *       201:
 *         description: Keterampilan berhasil ditambahkan ke pengguna
 *       500:
 *         description: Terjadi kesalahan
 */
router.post(
  "/user-skills",
  authenticateToken,
  userSkillController.createUserSkill
);

/**
 * @swagger
 * /user-skills/{skillId}:
 *   delete:
 *     summary: Menghapus keterampilan dari pengguna
 *     tags: [UserSkills]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: skillId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID keterampilan yang ingin dihapus
 *     responses:
 *       204:
 *         description: Keterampilan berhasil dihapus dari pengguna
 *       404:
 *         description: Keterampilan tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan
 */
router.delete(
  "/user-skills/:skillId",
  authenticateToken,
  userSkillController.deleteUserSkill
);

module.exports = router;
