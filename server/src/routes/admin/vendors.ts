import { Router, Request, Response } from 'express';
import Vendor from '../../db/models/vendor';

const router = Router();

router.post('/addVendor', async (req, res) => {
  try {
    const vendorData = req.body;
    const newVendor = new Vendor(vendorData);
    const savedVendor = await newVendor.save();
    res.status(201).json({ success: true, data: savedVendor });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Failed to add vendor', error });
  }
});

router.delete('/removeVendor:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVendor = await Vendor.findByIdAndDelete(id);
    if (!deletedVendor) {
      return res
        .status(404)
        .json({ success: false, message: 'Vendor not found' });
    }
    res
      .status(201)
      .json({ success: true, message: 'Vendor deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Failed to delete vendor', error });
  }
});

router.put('/updateVendor:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedVendor = await Vendor.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedVendor) {
      return res
        .status(404)
        .json({ success: false, message: 'Vendor not found' });
    }
    res.status(201).json({ success: true, data: updatedVendor });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Failed to update vendor', error });
  }
});

export default router;
