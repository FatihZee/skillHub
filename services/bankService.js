const { Banks } = require('../models');

class BankService {
  static async createBank(data) {
    return await Banks.create(data);
  }

  static async getBankById(id) {
    return await Banks.findByPk(id);
  }

  static async getAllBanks() {
    return await Banks.findAll();
  }

  static async updateBank(id, updateData) {
    const bank = await Banks.findByPk(id);
    if (bank) {
      return await bank.update(updateData);
    }
    return null;
  }

  static async deleteBank(id) {
    const bank = await Banks.findByPk(id);
    if (bank) {
      await bank.destroy();
      return true;
    }
    return false;
  }
}

module.exports = BankService;
