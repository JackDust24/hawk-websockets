import { Router, Request, Response } from 'express';
import User from '../../db/models/user';

//TODO: Apply Auth check to see if coming from User

const router = Router();

router.put('/updateUser/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const updateUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    if (!updateUser) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }
    res.status(201).json({ success: true, data: updateUser });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Failed to update user', error });
  }
});

router.delete('/deleteUser/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }
    res
      .status(201)
      .json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Failed to delete user', error });
  }
});

export default router;
