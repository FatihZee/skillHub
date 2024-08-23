const fs = require('fs');
const path = require('path');
const ServiceService = require('../services/serviceService');
const { Skill } = require('../models'); // Import model Skill

// Format nama file gambar
const formatImageName = (title, id) => {
  const formattedTitle = title.replace(/\s+/g, '_');
  return `${formattedTitle}_ID${id}.jpg`;
};

module.exports = {
  async createService(req, res) {
    try {
      const { title, description, isAvailable, skillId, basicPrice, standardPrice, premiumPrice } = req.body;
      const userId = req.user.id; // Ambil userId dari token
      const image = req.files ? req.files.image : null; // Dapatkan file gambar dari request

      // Verifikasi apakah skillId valid
      const skill = await Skill.findByPk(skillId);
      if (!skill) {
        return res.status(404).send('Skill not found');
      }

      // Buat service baru
      const service = await ServiceService.createService({ title, description, isAvailable, skillId, userId, basicPrice, standardPrice, premiumPrice });

      if (image) {
        // Format nama gambar dan simpan ke folder uploads
        const imageName = formatImageName(title, service.id);
        const imagePath = path.join(__dirname, '../uploads', imageName);
        await image.mv(imagePath);
        
        // Update service dengan path gambar
        await service.update({ image: `/uploads/${imageName}` });
      }

      res.status(201).json(service);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  async getAllServices(req, res) {
    try {
      const services = await ServiceService.getAllServices();
      res.json(services);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  async getServiceById(req, res) {
    try {
      const service = await ServiceService.getServiceById(req.params.id);
      if (service) {
        res.json(service);
      } else {
        res.status(404).send('Service not found');
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  async updateService(req, res) {
    try {
      const { title, description, isAvailable, skillId, basicPrice, standardPrice, premiumPrice } = req.body;
      const userId = req.user.id; // Ambil userId dari token
      const image = req.files ? req.files.image : null; // Dapatkan file gambar dari request

      // Verifikasi apakah skillId valid
      const skill = await Skill.findByPk(skillId);
      if (!skill) {
        return res.status(404).send('Skill not found');
      }

      const service = await ServiceService.getServiceById(req.params.id);
      if (!service) {
        return res.status(404).send('Service not found');
      }

      if (image) {
        // Hapus gambar lama jika ada
        if (service.image) {
          const oldImagePath = path.join(__dirname, '../uploads', service.image.replace('/uploads/', ''));
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }

        // Format nama gambar baru dan simpan ke folder uploads
        const imageName = formatImageName(title, service.id);
        const imagePath = path.join(__dirname, '../uploads', imageName);
        await image.mv(imagePath);

        // Update service dengan path gambar baru
        await service.update({ title, description, isAvailable, skillId, basicPrice, standardPrice, premiumPrice, image: `/uploads/${imageName}` });
      } else {
        // Update service tanpa mengganti gambar
        await service.update({ title, description, isAvailable, skillId, basicPrice, standardPrice, premiumPrice });
      }

      res.json(service);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  async deleteService(req, res) {
    try {
      const service = await ServiceService.getServiceById(req.params.id);
      if (!service) {
        return res.status(404).send('Service not found');
      }

      // Hapus gambar jika ada
      if (service.image) {
        const imagePath = path.join(__dirname, '../uploads', service.image.replace('/uploads/', ''));
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }

      const success = await ServiceService.deleteService(req.params.id);
      if (success) {
        res.status(204).send(); // No content
      } else {
        res.status(404).send('Service not found');
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
};
