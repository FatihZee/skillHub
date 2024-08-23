const { UserSkill } = require('../models');

class UserSkillService {
  static async createUserSkill(userId, skillId) {
    return UserSkill.create({ userId, skillId });
  }

  static async deleteUserSkill(userId, skillId) {
    return UserSkill.destroy({ where: { userId, skillId } });
  }
}

module.exports = UserSkillService;
