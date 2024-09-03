const { Portfolio, User } = require('../models');

class PortfolioService {
  static async createPortfolio(image, description, userId) {
    const imagePath = image ? `/uploads/${image}` : null;
    return Portfolio.create({ image: imagePath, description, userId });
  }

  static async getPortfolioById(id) {
    return Portfolio.findByPk(id, {
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email']
      }]
    });
  }

  static async getAllPortfolios() {
    return Portfolio.findAll({
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email']
      }]
    });
  }

  static async updatePortfolio(id, description, userId, image) {
    const portfolio = await Portfolio.findByPk(id);
    if (!portfolio) {
      throw new Error('Portfolio not found');
    }
    const imagePath = image ? `/uploads/${image}` : portfolio.image;
    return portfolio.update({ description, userId, image: imagePath });
  }

  static async deletePortfolio(id) {
    const portfolio = await Portfolio.findByPk(id);
    if (!portfolio) {
      throw new Error('Portfolio not found');
    }
    return portfolio.destroy();
  }
}

module.exports = PortfolioService;
