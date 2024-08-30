const { BankAccount, Banks, User } = require('../models');

class BankAccountService {
  static async createBankAccount({ userId, bankId, accountNumber }) {
    return await BankAccount.create({ userId, bankId, accountNumber });
  }

  static async getBankAccountById(id) {
    return await BankAccount.findByPk(id, {
      include: [
        {
          model: Banks,
          as: 'bank',
          attributes: ['id', 'nama', 'kode']
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email']
        }
      ]
    });
  }

  static async getAllBankAccounts() {
    return await BankAccount.findAll({
      include: [
        {
          model: Banks,
          as: 'bank',
          attributes: ['id', 'nama', 'kode']
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email']
        }
      ]
    });
  }

  static async updateBankAccount(id, updateData) {
    const bankAccount = await BankAccount.findByPk(id);
    if (bankAccount) {
      return await bankAccount.update(updateData);
    }
    return null;
  }

  static async deleteBankAccount(id) {
    const bankAccount = await BankAccount.findByPk(id);
    if (bankAccount) {
      await bankAccount.destroy();
      return true;
    }
    return false;
  }
}

module.exports = BankAccountService;
