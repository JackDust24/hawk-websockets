import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  fullname: string;
  email: string;
  rewardsInUse: mongoose.Types.ObjectId[];
  status: string;
  joinedDate: Date;
  lastUsedDate: Date;
}

const UserSchema: Schema = new Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  rewardsInUse: [{ type: Schema.Types.ObjectId, ref: 'RewardsInUse' }],
  status: { type: String, required: true },
  joinedDate: { type: Date, required: true },
  lastUsedDate: { type: Date, required: false },
});

export default mongoose.models.User ||
  mongoose.model<IUser>('User', UserSchema);
