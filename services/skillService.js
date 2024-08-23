// services/skillService.js
const { Skill } = require('../models');

class SkillService {
  static async createSkill(data) {
    return Skill.create(data);
  }

  static async getSkillById(id) {
    return Skill.findByPk(id);
  }

  static async getAllSkills() {
    return Skill.findAll();
  }

  static async updateSkill(id, data) {
    return Skill.update(data, { where: { id } });
  }

  static async deleteSkill(id) {
    return Skill.destroy({ where: { id } });
  }
}

module.exports = SkillService;
