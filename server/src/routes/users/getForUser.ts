import { Router, Request, Response } from 'express';
import RewardsInUse from '../../db/models/rewardsInUse';
import Reward from '../../db/models/reward';

//TODO: Apply Auth check to see if coming from User

const router = Router();

router.get('/retrieveAllRewardsInUseForUser/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const rewardsInUse = await RewardsInUse.find({ userId });

    if (rewardsInUse.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: 'No rewards in use for this user' });
    }

    res.json({ success: true, data: rewardsInUse });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve rewards in use',
      error,
    });
  }
});

router.get('/retrieveAllRewardsInUseByVendor/:vendorId', async (req, res) => {
  try {
    const { vendorId } = req.params;
    const rewards = await Reward.find({ vendorId });

    if (rewards.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: 'No rewards in use for this vendor' });
    }

    res.json({ success: true, data: rewards });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve rewards in use for this vendor',
      error,
    });
  }
});

router.get('/retrieveAllRewardsByIndustry', async (req, res) => {
  // Implement at later time
});

router.get(
  '/retrieveRewardsInUseByVendor/:userId/:vendorId',
  async (req, res) => {
    try {
      const { userId, vendorId } = req.params;

      // Query to find rewards in use for the given userId and vendorId
      const rewardsInUse = await RewardsInUse.find({ userId, vendorId });
      // .populate('rewardId', 'rewardTitle rewardDescription') // Populate reward details if needed
      // .populate('vendorId', 'name location') // Populate vendor details if needed
      // .exec();

      if (rewardsInUse.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No rewards in use for this user and vendor',
        });
      }

      res.json({ success: true, data: rewardsInUse });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve rewards in use',
        error: error.message,
      });
    }
  }
);

export default router;
