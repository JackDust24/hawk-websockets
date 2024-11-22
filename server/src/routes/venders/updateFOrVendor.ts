import { Router, Request, Response } from 'express';
import RewardsInUse from '../../db/models/rewardsInUse';
import Reward from '../../db/models/reward';

//TODO: Apply Auth check to see if coming from Vendor

const router = Router();

router.put('/useRewardStamp/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const rewardInUse = await RewardsInUse.findById(id);

    if (!rewardInUse) {
      return res
        .status(404)
        .json({ success: false, message: 'Reward not found' });
    }

    if (rewardInUse.rewardStampsUsed >= rewardInUse.rewardStamps) {
      return res
        .status(400)
        .json({ success: false, message: 'No more stamps available' });
    }

    rewardInUse.rewardStampsUsed += 1;
    await rewardInUse.save();

    res.json({ success: true, data: rewardInUse });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Failed to use reward stamp', error });
  }
});

router.put('/changeRewardStamp/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRewardInUse = await RewardsInUse.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedRewardInUse) {
      return res
        .status(404)
        .json({ success: false, message: 'Reward not found' });
    }
    res.status(201).json({ success: true, data: updatedRewardInUse });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Failed to update reward', error });
  }
});

router.put('/changeReward/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedReward = await Reward.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedReward) {
      return res
        .status(404)
        .json({ success: false, message: 'Reward not found' });
    }
    res.status(201).json({ success: true, data: updatedReward });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Failed to update reward', error });
  }
});

export default router;
