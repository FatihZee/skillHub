const { User, Skill, Portfolio, Service, Rating, BankAccount, Banks, SkillSwap, sequelize } = require('../models');
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
        },
        {
          model: BankAccount,
          as: 'bankAccounts',
          attributes: ['id', 'accountNumber'],
          include: [
            {
              model: Banks,
              as: 'bank',
              attributes: ['id', 'nama', 'kode']
            }
          ]
        },
        {
          model: SkillSwap,
          as: 'offerings',
          attributes: ['id', 'offeredSkillId', 'description', 'status'],
          include: [
            { model: Skill, as: 'offeredSkill', attributes: ['id', 'name'] }
          ],
          where: { offeringUserId: id },
          required: false,
        },
        {
          model: SkillSwap,
          as: 'requests',
          attributes: ['id', 'offeredSkillId', 'description', 'status'],
          include: [
            { model: Skill, as: 'offeredSkill', attributes: ['id', 'name'] }
          ],
          where: { requestingUserId: id },
          required: false,
        }
      ],
      order: [[sequelize.col('createdAt'), 'ASC']]
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
        },
        {
          model: BankAccount,
          as: 'bankAccounts',
          attributes: ['id', 'accountNumber'],
          include: [
            {
              model: Banks,
              as: 'bank',
              attributes: ['id', 'nama', 'kode']
            }
          ]
        },
        {
          model: SkillSwap,
          as: 'offerings',
          attributes: ['id', 'offeredSkillId', 'description', 'status'],
          include: [
            { model: Skill, as: 'offeredSkill', attributes: ['id', 'name'] }
          ],
          required: false
        },
        {
          model: SkillSwap,
          as: 'requests',
          attributes: ['id', 'offeredSkillId', 'description', 'status'],
          include: [
            { model: Skill, as: 'offeredSkill', attributes: ['id', 'name'] }
          ],
          required: false
        }
      ],
      order: [[sequelize.col('createdAt'), 'ASC']]
    });
  }

  static async updateUser(id, updateData) {
    const user = await User.findByPk(id);
    if (user) {
      // Jika ada password baru, hash password tersebut sebelum melakukan update
      if (updateData.password) {
        updateData.password = await hashPassword(updateData.password);
      }
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