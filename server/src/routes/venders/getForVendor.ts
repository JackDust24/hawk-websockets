import { Router, Request, Response } from 'express';
import RewardsInUse from '../../db/models/rewardsInUse';
import Reward from '../../db/models/reward';

//TODO: Apply Auth check to see if coming from Vendor

const router = Router();

router.get('/listRewards/:vendorId', async (req, res) => {
  try {
    const { vendorId } = req.params;
    const rewards = await Reward.find({ vendorId });

    if (rewards.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: 'No rewards created' });
    }

    res.json({ success: true, data: rewards });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve any rewards',
      error,
    });
  }
});

router.get('/listAllRewardsActive/:vendorId', async (req, res) => {
  try {
    const { vendorId } = req.params;
    const rewardsInUse = await Reward.find({
      vendorId,
      status: 'active',
    });

    if (rewardsInUse.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: 'No rewards in use' });
    }

    res.json({ success: true, data: rewardsInUse });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve any rewards in use',
      error,
    });
  }
});

router.get('/listAllRewardsInUse/:vendorId', async (req, res) => {
  try {
    const { vendorId } = req.params;
    const rewardsInUse = await RewardsInUse.find({
      vendorId,
    });

    if (rewardsInUse.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: 'No rewards in use' });
    }

    res.json({ success: true, data: rewardsInUse });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve any rewards in use',
      error,
    });
  }
});

router.get('/listAllRewardsInUseByUser/:vendorId/:userId', async (req, res) => {
  try {
    const { userId, vendorId } = req.params;
    const rewardsInUse = await RewardsInUse.find({ userId, vendorId });

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
      message: 'Failed to retrieve any rewards in use',
      error,
    });
  }
});

export default router;
