// controllers/waController.js

const waService = require('../services/waService');

const getWhatsAppLink = async (req, res) => {
  try {
    const userId = req.params.id;
    const currentUserName = req.user.name; // Ambil nama user yang sedang login dari req.user
    const waLink = await waService.getWhatsAppLinkForUser(userId, currentUserName);
    res.json({ waLink });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getWhatsAppLink,
};
