const fs = require('fs');
const path = require('path');
const PortfolioService = require('../services/portfolioService');
const { User } = require('../models');

module.exports = {
  async getAllPortfolios(req, res) {
    try {
      const portfolios = await PortfolioService.getAllPortfolios();
      res.json(portfolios);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  async getPortfolioById(req, res) {
    try {
      const portfolio = await PortfolioService.getPortfolioById(req.params.id);
      if (portfolio) {
        res.json(portfolio);
      } else {
        res.status(404).send({ message: 'Portfolio not found' });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  async createPortfolio(req, res) {
    try {
      const { description } = req.body;
      const userId = req.user.id; // Ambil userId dari token
  
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
  
      let imageName = null;
  
      if (req.files && req.files.image) {
        const userNameFormatted = user.name.replace(/\s+/g, '_');
        imageName = `${userNameFormatted}_portfolio.jpg`;
        const imagePath = path.join(__dirname, '../uploads', imageName);
  
        req.files.image.mv(imagePath, (err) => {
          if (err) {
            return res.status(500).send(err);
          }
        });
      }
  
      const portfolio = await PortfolioService.createPortfolio(imageName, description, userId);
      res.status(201).json(portfolio);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
  
  async updatePortfolio(req, res) {
    try {
      const { description } = req.body;
      const userId = req.user.id; // Ambil userId dari token

      const portfolio = await PortfolioService.getPortfolioById(req.params.id);
      if (!portfolio) {
        return res.status(404).send({ message: 'Portfolio not found' });
      }

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }

      let updatedData = { description, userId };
      let imageName = portfolio.image;

      if (req.files && req.files.image) {
        const userNameFormatted = user.name.replace(/\s+/g, '_');
        imageName = `${userNameFormatted}_portfolio.jpg`;
        const newImagePath = path.join(__dirname, '../uploads', imageName);

        if (portfolio.image) {
          const oldImagePath = path.join(__dirname, '../uploads', portfolio.image);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath); // Hapus gambar lama
          }
        }

        req.files.image.mv(newImagePath, (err) => {
          if (err) {
            return res.status(500).send(err);
          }
        });
        updatedData.image = imageName;
      }

      const updatedPortfolio = await PortfolioService.updatePortfolio(req.params.id, updatedData.description, updatedData.userId, updatedData.image);
      res.json(updatedPortfolio);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  async deletePortfolio(req, res) {
    try {
      const portfolio = await PortfolioService.getPortfolioById(req.params.id);
      if (!portfolio) {
        return res.status(404).send({ message: 'Portfolio not found' });
      }

      if (portfolio.image) {
        const imagePath = path.join(__dirname, '../uploads', portfolio.image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath); // Hapus gambar terkait
        }
      }

      await PortfolioService.deletePortfolio(req.params.id);
      res.status(204).send(); // No content
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
};
