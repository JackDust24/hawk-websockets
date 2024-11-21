import mongoose, { Schema, Document } from 'mongoose';

export interface IReward extends Document {
  vendorId: mongoose.Types.ObjectId[];
  vendorName: string;
  rewardTitle: string;
  rewardInfo: string;
  rewardDescription: string;
  rewardStamps: number;
  status: string;
  rewardUrl: string;
}

const RewardSchema: Schema = new Schema({
  vendorId: [{ type: Schema.Types.ObjectId, ref: 'Vendor' }],
  vendorName: { type: String, required: true },
  rewardTitle: { type: Number, required: true },
  rewardInfo: { type: String, required: true },
  rewardDescription: { type: Number, required: true },
  rewardStamps: { type: Number, required: true },
  status: { type: String, required: true },
  rewardUrl: { type: String, required: false },
});

export default mongoose.model<IReward>('Reward', RewardSchema);
