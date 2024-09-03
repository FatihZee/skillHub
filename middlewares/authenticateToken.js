const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Pastikan ini sesuai dengan struktur proyek Anda
require('dotenv').config();

const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET;

async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Token required' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    
    // Cari user di database berdasarkan ID dari token
    const user = await User.findByPk(decoded.id);
    
    if (!user) {
      return res.status(403).json({ message: 'User not found' });
    }

    // Menyimpan user yang terautentikasi ke dalam req.user
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
}

module.exports = authenticateToken;
