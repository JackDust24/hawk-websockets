import { Router, Request, Response } from 'express';
import Reward from '../../db/models/reward';
import RewardsInUse from '../../db/models/rewardsInUse';

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

router.post('/addRewardForUser/:userId/:rewardId/:stamps', async (req, res) => {
  const rewardData = req.body;

  try {
    const { userId, rewardId, stamps } = req.params;
    const stampsToUse = Number(stamps); // Convert to a number first
    const validStampsToUse =
      !isNaN(stampsToUse) && stampsToUse > 0 && Number.isInteger(stampsToUse)
        ? stampsToUse
        : 1;

    const rewardInUse = await RewardsInUse.findOne({ userId, rewardId });

    if (rewardInUse) {
      // Ensure rewardStampsUsed doesn't exceed rewardStamps
      const newRewardStampsUsed = Math.min(
        rewardInUse.rewardStamps,
        rewardInUse.rewardStampsUsed + validStampsToUse
      );

      if (newRewardStampsUsed >= rewardInUse.rewardStamps) {
        return res.status(400).json({
          success: false,
          message: 'User already using reward and no more stamps available',
        });
      }

      rewardInUse.rewardStampsUsed = newRewardStampsUsed;
      await rewardInUse.save();

      return res.status(200).json({ success: true, data: rewardInUse });
    }

    const newRewardData = {
      ...rewardData,
      userId,
      rewardStampsUsed: stamps,
    };

    const newRewardsInUse = new RewardsInUse(newRewardData);
    const savedReward = await newRewardsInUse.save();

    res.status(201).json({ success: true, data: savedReward });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to add reward for user',
      error,
    });
  }
});

export default router;
