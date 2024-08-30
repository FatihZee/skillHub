const BankAccountService = require('../services/bankAccountService');

class BankAccountController {
    static async createBankAccount(req, res) {
        try {
          const { bankId, accountNumber } = req.body;
          const userId = req.user.id; // Dapatkan userId dari token
          const newBankAccount = await BankAccountService.createBankAccount({ 
            userId, 
            bankId: parseInt(bankId, 10), // Konversi bankId ke integer
            accountNumber 
          });
          res.status(201).json(newBankAccount);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }

  static async getBankAccountById(req, res) {
    try {
      const { id } = req.params;
      const bankAccount = await BankAccountService.getBankAccountById(id);
      if (bankAccount) {
        res.status(200).json(bankAccount);
      } else {
        res.status(404).json({ message: 'Bank account not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllBankAccounts(req, res) {
    try {
      const bankAccounts = await BankAccountService.getAllBankAccounts();
      res.status(200).json(bankAccounts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateBankAccount(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedBankAccount = await BankAccountService.updateBankAccount(id, updateData);
      if (updatedBankAccount) {
        res.status(200).json(updatedBankAccount);
      } else {
        res.status(404).json({ message: 'Bank account not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteBankAccount(req, res) {
    try {
      const { id } = req.params;
      const success = await BankAccountService.deleteBankAccount(id);
      if (success) {
        res.status(200).json({ message: 'Bank account deleted successfully' });
      } else {
        res.status(404).json({ message: 'Bank account not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = BankAccountController;
