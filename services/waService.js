const { User } = require('../models');

/**
 * Fungsi untuk memformat nomor telepon dari '08' menjadi '62'.
 * @param {string} phone - Nomor telepon pengguna.
 * @returns {string} - Nomor telepon yang telah diformat.
 */
const formatPhoneNumber = (phone) => {
  return phone.replace(/^0/, '62');
};

/**
 * Fungsi untuk mendapatkan link wa.me untuk menghubungi user lain.
 * @param {number} userId - ID dari user yang ingin dihubungi.
 * @param {string} currentUserName - Nama user yang sedang login.
 * @returns {Promise<string>} - Link wa.me dengan template pesan yang panjang.
 */
const getWhatsAppLinkForUser = async (userId, currentUserName) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error("User not found");
  }
  
  const formattedPhone = formatPhoneNumber(user.phone);
  const message = `Hello ${user.name},\n\nMy name is ${currentUserName}. I found your profile on our platform and would like to connect with you regarding your services and expertise.\n\nLooking forward to hearing from you!\n\nBest regards,\n${currentUserName}`;
  
  return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
};

module.exports = {
  getWhatsAppLinkForUser,
};
