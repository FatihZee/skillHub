// controllers/skillController.js
const SkillService = require('../services/skillService');

module.exports = {
  async getAllSkills(req, res) {
    try {
      const skills = await SkillService.getAllSkills();
      res.json(skills);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  async getSkillById(req, res) {
    try {
      const skill = await SkillService.getSkillById(req.params.id);
      if (skill) {
        res.json(skill);
      } else {
        res.status(404).send('Skill not found');
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  async createSkill(req, res) {
    try {
      const skill = await SkillService.createSkill(req.body);
      res.status(201).json(skill);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  async updateSkill(req, res) {
    try {
      const [updated] = await SkillService.updateSkill(req.params.id, req.body);
      if (updated) {
        const updatedSkill = await SkillService.getSkillById(req.params.id);
        res.json(updatedSkill);
      } else {
        res.status(404).send('Skill not found');
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  async deleteSkill(req, res) {
    try {
      const deleted = await SkillService.deleteSkill(req.params.id);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).send('Skill not found');
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
};
