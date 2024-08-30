const BankService = require('../services/bankService');

class BankController {
  static async createBank(req, res) {
    try {
      const newBank = await BankService.createBank(req.body);
      res.status(201).json(newBank);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getBankById(req, res) {
    try {
      const bank = await BankService.getBankById(req.params.id);
      if (bank) {
        res.status(200).json(bank);
      } else {
        res.status(404).json({ message: 'Bank not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllBanks(req, res) {
    try {
      const banks = await BankService.getAllBanks();
      res.status(200).json(banks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateBank(req, res) {
    try {
      const updatedBank = await BankService.updateBank(req.params.id, req.body);
      if (updatedBank) {
        res.status(200).json(updatedBank);
      } else {
        res.status(404).json({ message: 'Bank not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteBank(req, res) {
    try {
      const success = await BankService.deleteBank(req.params.id);
      if (success) {
        res.status(200).json({ message: 'Bank deleted successfully' });
      } else {
        res.status(404).json({ message: 'Bank not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = BankController;
