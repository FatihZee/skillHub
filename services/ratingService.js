const { Rating, sequelize } = require('../models');

class RatingService {
  // Menambahkan rating
  static async createRating({ ratingValue, comment, targetUserId, raterId }) {
    return await Rating.create({
      ratingValue,
      comment,
      userId: targetUserId,
      ratedBy: raterId,
    });
  }

  // Mendapatkan rating berdasarkan ID user
  static async getRatingsByUserId(userId) {
    return await Rating.findAll({
      where: { userId },
    });
  }

  // Mendapatkan rata-rata rating berdasarkan ID user
  static async getAverageRatingByUserId(userId) {
    const result = await sequelize.query(`
      SELECT AVG(ratingValue) as averageRating
      FROM Ratings
      WHERE userId = ?
    `, {
      replacements: [userId],
      type: sequelize.QueryTypes.SELECT
    });

    return result[0]?.averageRating || 0;
  }
}

module.exports = RatingService;
