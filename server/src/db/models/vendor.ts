import mongoose, { Schema, Document } from 'mongoose';

export interface IVendor extends Document {
  name: string;
  location: string;
  industry: string;
  fullBusinessName: string;
  status: string;
  packageId: string;
  rewardsAllowed: number;
  rewardsCreated: mongoose.Types.ObjectId[];
  rewardsCurrentlyLive: mongoose.Types.ObjectId[];
  duration: string;
  vendorEmail: string;
  vendorPassword: string;
  vendorImage: string;
}

const VendorSchema: Schema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  industry: { type: String, required: true },
  fullBusinessName: { type: String, required: true },
  status: { type: String, required: true },
  packageId: { type: String, required: true },
  rewardsAllowed: { type: Number, required: true },
  rewardsCreated: [{ type: Schema.Types.ObjectId, ref: 'Reward' }],
  rewardsCurrentlyLive: [{ type: Schema.Types.ObjectId, ref: 'Reward' }],
  duration: { type: String, required: true },
  vendorEmail: { type: String, required: true },
  vendorPassword: { type: String, required: true },
  vendorImage: { type: String, required: false },
});

export default mongoose.models.Vendor ||
  mongoose.model<IVendor>('Vendor', VendorSchema);
