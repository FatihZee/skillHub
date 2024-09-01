const { SkillSwap, User, Skill } = require('../models');
const { Op } = require('sequelize');

const createSkillSwap = async (offeredSkillId, description, userId) => {
  const offeredSkill = await Skill.findByPk(offeredSkillId);
  if (!offeredSkill) {
    throw new Error('Offered skill not found');
  }

  return SkillSwap.create({
    offeringUserId: userId,
    offeredSkillId,
    description,
  });
};

const requestSkillSwap = async (skillSwapId, requestedSkillId, requestingUserId) => {
  const skillSwap = await SkillSwap.findByPk(skillSwapId);
  if (!skillSwap) {
    throw new Error('SkillSwap not found');
  }

  const requestedSkill = await Skill.findByPk(requestedSkillId);
  if (!requestedSkill) {
    throw new Error('Requested skill not found');
  }

  skillSwap.requestingUserId = requestingUserId;
  skillSwap.requestedSkillId = requestedSkillId;
  
  return skillSwap.save();
};

const updateSkillSwapStatus = async (skillSwapId, status) => {
  if (!['accepted', 'rejected'].includes(status)) {
    throw new Error('Invalid status');
  }

  const skillSwap = await SkillSwap.findByPk(skillSwapId);
  if (!skillSwap) {
    throw new Error('SkillSwap not found');
  }

  skillSwap.status = status;
  return skillSwap.save();
};

const getSkillSwapsForUser = async (userId) => {
  return SkillSwap.findAll({
    where: {
      [Op.or]: [
        { offeringUserId: userId },
        { requestingUserId: userId }
      ]
    },
    include: [
      { model: User, as: 'offeringUser' },
      { model: User, as: 'requestingUser' },
      { model: Skill, as: 'offeredSkill' },
      { model: Skill, as: 'requestedSkill' }
    ]
  });
};

const getSkillSwapsOfferedByUser = async (userId) => {
  return SkillSwap.findAll({
    where: {
      offeringUserId: userId
    },
    include: [
      { model: User, as: 'requestingUser' },
      { model: Skill, as: 'offeredSkill' },
      { model: Skill, as: 'requestedSkill' }
    ]
  });
};

const getAllSkillSwaps = async () => {
  return SkillSwap.findAll({
    include: [
      { model: User, as: 'offeringUser' },
      { model: User, as: 'requestingUser' },
      { model: Skill, as: 'offeredSkill' },
      { model: Skill, as: 'requestedSkill' }
    ]
  });
};

module.exports = {
  createSkillSwap,
  requestSkillSwap,
  updateSkillSwapStatus,
  getSkillSwapsForUser,
  getSkillSwapsOfferedByUser,
  getAllSkillSwaps
};
