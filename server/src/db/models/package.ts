import mongoose, { Schema, Document } from 'mongoose';

export interface IPackage extends Document {
  type: string;
  duration: number;
  rewardsAllowed: number;
  frequency: string;
  price: number;
  discountPrice: number;
}

const PackageSchema: Schema = new Schema({
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  rewardsAllowed: { type: Number, required: true },
  frequency: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number, required: false },
});

export default mongoose.model<IPackage>('Package', PackageSchema);
