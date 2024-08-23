const { Service } = require('../models');

class ServiceService {
  static async createService({ title, description, isAvailable, skillId, userId, basicPrice, standardPrice, premiumPrice, image }) {
    // Buat service baru dengan gambar
    const service = await Service.create({ title, description, isAvailable, skillId, userId, basicPrice, standardPrice, premiumPrice, image });
    return service;
  }

  static async getAllServices() {
    return await Service.findAll({ 
      include: ['user', 'skill'] 
    });
  }

  static async getServiceById(id) {
    return await Service.findByPk(id, { 
      include: ['user', 'skill'] 
    });
  }

  static async updateService(id, updateData, imagePath = null) {
    const service = await Service.findByPk(id);
    if (service) {
      // Jika ada gambar baru, hapus gambar lama
      if (imagePath && service.image) {
        const oldImagePath = path.join(__dirname, '../uploads', service.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath); // Hapus gambar lama
        }
        updateData.image = imagePath; // Update dengan gambar baru
      }
      await service.update(updateData);
      return service;
    }
    return null;
  }

  static async deleteService(id) {
    const service = await Service.findByPk(id);
    if (service) {
      // Hapus gambar terkait
      if (service.image) {
        const imagePath = path.join(__dirname, '../uploads', service.image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath); // Hapus gambar
        }
      }
      await service.destroy();
      return true;
    }
    return false;
  }
}

module.exports = ServiceService;
