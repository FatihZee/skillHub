const { User } = require('../models');
const { hashPassword, comparePassword } = require('../helpers/bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET;

class AuthService {
  static async register(name, email, password, phone) {
    try {
      const hashedPassword = await hashPassword(password);

      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        phone,
      });

      return newUser;
    } catch (error) {
      console.error('Error saat registrasi:', error.message);
      throw error;
    }
  }

  static async login(email, password) {
    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        console.error('Pengguna tidak ditemukan');
        throw new Error('Email atau password tidak valid');
      }

      const isMatch = await comparePassword(password, user.password);

      if (!isMatch) {
        console.error('Password tidak cocok');
        throw new Error('Email atau password tidak valid');
      }

      const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
        expiresIn: '1h',
      });

      return { user, token };
    } catch (error) {
      console.error('Error saat login:', error.message);
      throw error;
    }
  }

  static async logout(req) {
    req.session = null; // Jika menggunakan sesi
    return true;
  }
}

module.exports = AuthService;
