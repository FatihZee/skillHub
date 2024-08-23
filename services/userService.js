const { User, Skill, Portfolio, Service } = require("../models");
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
          attributes: ['id', 'image', 'description', 'createdAt', 'updatedAt']
        },
        {
          model: Service,
          as: 'services',
          attributes: ['id', 'title', 'description', 'isAvailable', 'skillId', 'createdAt', 'updatedAt', 'basicPrice', 'standardPrice', 'premiumPrice'],
          include: [
            {
              model: Skill,
              as: 'skill',
              attributes: ['id', 'name']
            }
          ]
        }
      ]
    });
  }

  static async getAllUsers() {
    return await User.findAll({
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
          attributes: ['id', 'image', 'description', 'createdAt', 'updatedAt']
        },
        {
          model: Service,
          as: 'services',
          attributes: ['id', 'title', 'description', 'isAvailable', 'skillId', 'createdAt', 'updatedAt', 'basicPrice', 'standardPrice', 'premiumPrice'],
          include: [
            {
              model: Skill,
              as: 'skill',
              attributes: ['id', 'name']
            }
          ]
        }
      ]
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
