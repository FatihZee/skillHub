const AuthService = require('../services/authService');

module.exports = {
  async register(req, res) {
    try {
      const { name, email, password, phone } = req.body;
      const newUser = await AuthService.register(name, email, password, phone);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const { user, token } = await AuthService.login(email, password);
      
      res.status(200).json({ message: 'Login berhasil', token, user });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  },

  async logout(req, res) {
    try {
      await AuthService.logout(req);
      res.status(200).json({ message: 'Logout berhasil' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
