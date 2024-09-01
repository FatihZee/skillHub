const skillSwapService = require('../services/skillSwapService');

const createSkillSwap = async (req, res) => {
  try {
    const { offeredSkillId, description } = req.body;
    const userId = req.user.id;  // Extracted from JWT token
    const skillSwap = await skillSwapService.createSkillSwap(offeredSkillId, description, userId);
    res.status(201).json(skillSwap);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const requestSkillSwap = async (req, res) => {
  try {
    const { skillSwapId } = req.params;
    const { requestedSkillId } = req.body;
    const requestingUserId = req.user.id;  // Extracted from JWT token
    const skillSwap = await skillSwapService.requestSkillSwap(skillSwapId, requestedSkillId, requestingUserId);
    res.json(skillSwap);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateSkillSwapStatus = async (req, res) => {
  try {
    const { skillSwapId } = req.params;
    const { status } = req.body;
    const skillSwap = await skillSwapService.updateSkillSwapStatus(skillSwapId, status);
    res.json(skillSwap);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getSkillSwapsForUser = async (req, res) => {
  try {
    const userId = req.user.id;  // Extracted from JWT token
    const skillSwaps = await skillSwapService.getSkillSwapsForUser(userId);
    res.json(skillSwaps);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getSkillSwapsOfferedByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const skillSwaps = await skillSwapService.getSkillSwapsOfferedByUser(userId);
    res.json(skillSwaps);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllSkillSwaps = async (req, res) => {
  try {
    const skillSwaps = await skillSwapService.getAllSkillSwaps();
    res.json(skillSwaps);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createSkillSwap,
  requestSkillSwap,
  updateSkillSwapStatus,
  getSkillSwapsForUser,
  getSkillSwapsOfferedByUser,
  getAllSkillSwaps
};
