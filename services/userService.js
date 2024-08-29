const { User, Skill, Portfolio, Service, Rating, sequelize } = require('../models');
const { hashPassword } = require("../helpers/bcrypt");

class UserService {
  static async createUser({ name, email, password, phone, profileImagePath, coverImagePath }) {
    const hashedPassword = await hashPassword(password);
    const data = {
      name,
      email,
      password: hashedPassword,
      phone,
      profileImage: profileImagePath,
      coverImage: coverImagePath,
    };
    return await User.create(data);
  }

  static async getUserById(id) {
    return await User.findByPk(id, {
      attributes: {
        include: [
          [
            sequelize.literal(`(
              SELECT AVG(ratingValue)
              FROM Ratings
              WHERE userId = User.id
            )`),
            'averageRating'
          ]
        ]
      },
      include: [
        {
          model: Skill,
          as: 'skills',
          attributes: ['id', 'name'],
          through: { attributes: [] }
        },
        {
          model: Portfolio,
          as: 'portfolios',
          attributes: ['id', 'image', 'description']
        },
        {
          model: Service,
          as: 'services',
          attributes: ['id', 'title', 'description', 'isAvailable', 'skillId', 'basicPrice', 'standardPrice', 'premiumPrice'],
          include: [
            {
              model: Skill,
              as: 'skill',
              attributes: ['id', 'name']
            }
          ]
        },
        {
          model: Rating,
          as: 'ratings',
          attributes: ['id', 'ratingValue', 'comment']
        }
      ],
      order: [[sequelize.col('createdAt'), 'ASC']] // Mengurutkan berdasarkan createdAt secara ascending
    });
  }

  static async getAllUsers() {
    return await User.findAll({
      attributes: {
        include: [
          [
            sequelize.literal(`(
              SELECT AVG(ratingValue)
              FROM Ratings
              WHERE userId = User.id
            )`),
            'averageRating'
          ]
        ]
      },
      include: [
        {
          model: Skill,
          as: 'skills',
          attributes: ['id', 'name'],
          through: { attributes: [] }
        },
        {
          model: Portfolio,
          as: 'portfolios',
          attributes: ['id', 'image', 'description']
        },
        {
          model: Service,
          as: 'services',
          attributes: ['id', 'title', 'description', 'isAvailable', 'skillId', 'basicPrice', 'standardPrice', 'premiumPrice'],
          include: [
            {
              model: Skill,
              as: 'skill',
              attributes: ['id', 'name']
            }
          ]
        },
        {
          model: Rating,
          as: 'ratings',
          attributes: ['id', 'ratingValue', 'comment']
        }
      ],
      order: [[sequelize.col('createdAt'), 'ASC']] // Mengurutkan berdasarkan createdAt secara ascending
    });
  }

  static async updateUser(id, updateData) {
    const user = await User.findByPk(id);
    if (user) {
      return await user.update(updateData);
    }
    return null;
  }

  static async deleteUser(id) {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      return true;
    }
    return false;
  }
}

module.exports = UserService;
