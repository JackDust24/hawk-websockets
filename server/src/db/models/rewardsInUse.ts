import mongoose, { Schema, Document } from 'mongoose';

export interface IRewardsInUse extends Document {
  rewardId: mongoose.Types.ObjectId;
  vendorId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  rewardStamps: number;
  rewardStampsUsed: number;
  startedDate: Date;
  lastUsed: Date;
  claimed: boolean;
}

const RewardsInUseSchema: Schema = new Schema(
  {
    rewardId: { type: Schema.Types.ObjectId, ref: 'Reward' },
    vendorId: { type: Schema.Types.ObjectId, ref: 'Vendor' },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    rewardStamps: {
      type: Number,
      required: true,
      min: [0, 'rewardStamps must be a positive number'], // Enforces positive numbers
      validate: {
        validator: Number.isInteger, // Rejects decimals
        message: 'rewardStamps must be an integer',
      },
    },
    rewardStampsUsed: {
      type: Number,
      required: true,
      min: [0, 'rewardStampsUsed must be a positive number'], // Enforces positive numbers
      validate: {
        validator: Number.isInteger, // Rejects decimals
        message: 'rewardStampsUsed must be an integer',
      },
    },
    startedDate: { type: Date, required: true, default: Date.now },
    lastUsed: { type: Date, required: true, default: Date.now },
    claimed: { type: Boolean, required: false },
  },
  { timestamps: { createdAt: 'startedDate', updatedAt: 'lastUsed' } } // Auto-manage dates
);

export default mongoose.models.RewardsInUse ||
  mongoose.model<IRewardsInUse>('RewardsInUse', RewardsInUseSchema);
