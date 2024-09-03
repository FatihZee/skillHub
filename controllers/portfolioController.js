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
        res.status(404).send({ message: 'Portfolio tidak ditemukan' });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  async createPortfolio(req, res) {
    try {
      const { description } = req.body;
      const userId = req.user.id;
  
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).send({ message: 'Pengguna tidak ditemukan' });
      }
  
      let imageName = 'default_image.jpg'; // Ganti dengan nama gambar default jika tidak ada gambar
  
      // Pertama, buat portfolio dengan nama gambar default
      const portfolio = await PortfolioService.createPortfolio(imageName, description, userId);
  
      // Jika ada gambar yang diunggah
      if (req.files && req.files.image) {
        const userNameFormatted = user.name.replace(/\s+/g, '_');
        imageName = `${userNameFormatted}_portfolio_ID${portfolio.id}.jpg`;
        const imagePath = path.join(__dirname, '../uploads', imageName);
  
        req.files.image.mv(imagePath, (err) => {
          if (err) {
            return res.status(500).send(err);
          }
        });
  
        // Perbarui portfolio dengan nama gambar yang baru
        await PortfolioService.updatePortfolio(portfolio.id, description, userId, imageName);
      }
  
      // Ambil portfolio yang sudah diperbarui dengan nama gambar
      const updatedPortfolio = await PortfolioService.getPortfolioById(portfolio.id);
      res.status(201).json(updatedPortfolio);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  async updatePortfolio(req, res) {
    try {
      const { description } = req.body;
      const userId = req.user.id;
  
      const portfolio = await PortfolioService.getPortfolioById(req.params.id);
      if (!portfolio) {
        return res.status(404).send({ message: 'Portfolio tidak ditemukan' });
      }
  
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).send({ message: 'Pengguna tidak ditemukan' });
      }
  
      let updatedData = { description, userId };
      let imageName = portfolio.image || 'default_image.jpg'; // Ganti dengan nama gambar default jika tidak ada gambar
  
      if (req.files && req.files.image) {
        const userNameFormatted = user.name.replace(/\s+/g, '_');
        imageName = `${userNameFormatted}_portfolio_ID${portfolio.id}.jpg`;
        const newImagePath = path.join(__dirname, '../uploads', imageName);
  
        // Hapus gambar lama jika ada
        if (portfolio.image && portfolio.image !== 'default_image.jpg') {
          const oldImagePath = path.join(__dirname, '../uploads', portfolio.image.replace('/uploads/', ''));
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
  
        req.files.image.mv(newImagePath, (err) => {
          if (err) {
            return res.status(500).send(err);
          }
        });
        updatedData.image = imageName;
      } else {
        // Jika tidak ada gambar baru, gunakan gambar lama atau default
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
        return res.status(404).send({ message: 'Portfolio tidak ditemukan' });
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
