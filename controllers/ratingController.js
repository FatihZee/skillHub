const RatingService = require('../services/ratingService');
const { User } = require('../models');

class RatingController {
  // Menambahkan rating
  static async addRating(req, res) {
    const { ratingValue, comment, targetUserId } = req.body;
    const raterId = req.user.id; // Mendapatkan ID pengguna dari token

    try {
      const rating = await RatingService.createRating({
        ratingValue,
        comment,
        targetUserId,
        raterId
      });
      res.status(201).json(rating);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Mendapatkan rating berdasarkan ID user
  static async getRatingsByUserId(req, res) {
    const userId = parseInt(req.params.userId);

    try {
      const ratings = await RatingService.getRatingsByUserId(userId);
      res.status(200).json(ratings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Mendapatkan rata-rata rating berdasarkan ID user
  static async getAverageRatingByUserId(req, res) {
    const userId = parseInt(req.params.userId);

    try {
      const averageRating = await RatingService.getAverageRatingByUserId(userId);
      res.status(200).json({ averageRating });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = RatingController;
