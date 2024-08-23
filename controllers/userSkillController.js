const UserSkillService = require('../services/userSkillService');

module.exports = {
  async createUserSkill(req, res) {
    try {
      const { skillId } = req.body; // Expect skillId from request body
      const userId = req.user.id; // Extract userId from token

      const userSkill = await UserSkillService.createUserSkill(userId, skillId);
      res.status(201).json(userSkill);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  async deleteUserSkill(req, res) {
    try {
      const userId = req.user.id; // Extract userId from token
      const { skillId } = req.params;

      const deleted = await UserSkillService.deleteUserSkill(userId, skillId);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).send('UserSkill not found');
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
};
