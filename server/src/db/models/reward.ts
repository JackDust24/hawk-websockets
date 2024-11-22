import mongoose, { Schema, Document } from 'mongoose';

export interface IReward extends Document {
  vendorId: mongoose.Types.ObjectId;
  vendorName: string;
  rewardTitle: string;
  rewardInfo: string;
  rewardDescription: string;
  rewardStamps: number;
  status: string;
  rewardUrl: string;
  rewardImage: string;
}

const RewardSchema: Schema = new Schema({
  vendorId: { type: Schema.Types.ObjectId, ref: 'Vendor' },
  vendorName: { type: String, required: true },
  rewardTitle: { type: String, required: true },
  rewardInfo: { type: String, required: true },
  rewardDescription: { type: String, required: true },
  rewardStamps: { type: Number, required: true },
  status: { type: String, required: true },
  rewardUrl: { type: String, required: false },
  rewardImage: { type: String, required: false },
});

export default mongoose.models.Reward ||
  mongoose.model<IReward>('Reward', RewardSchema);
