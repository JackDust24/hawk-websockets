import { Router, Request, Response } from 'express';
import User from '../../db/models/user';

//TODO: Apply Auth check to see if coming from User

const router = Router();

router.post('/addUser', async (req, res) => {
  try {
    const userData = req.body;
    const newUser = new User(userData);
    const savedReward = await newUser.save();
    res.status(201).json({ success: true, data: savedReward });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Failed to add user', error });
  }
});

export default router;
