import { Router, Request, Response } from 'express';
import Reward from '../../db/models/reward';

//TODO: Apply Auth check to see if coming from Vendor

const router = Router();

router.post('/addReward', async (req, res) => {
  try {
    const rewardData = req.body;
    const newReward = new Reward(rewardData);
    const savedReward = await newReward.save();
    res.status(201).json({ success: true, data: savedReward });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Failed to add reward', error });
  }
});

router.post('/addRewardForUser:userId', async (req, res) => {
  // 1. First we need to do a check on userId to see if already exists on here,
  // if so then just do an update on the rewardStamps
  // 2. With userId, vendorId and rewardId add new record
});

export default router;
