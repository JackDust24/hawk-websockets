import mongoose, { Schema, Document } from 'mongoose';

// const packageSchema = new mongoose.Schema({
//   type: String,
//   duration: Number,
//   rewardsAllowed: Number,
//   frequency: String,
//   price: Number,
//   discountPrice: Number,
// });

// const userSchema = new mongoose.Schema({
//   fullname: String,
//   email: { type: String, unique: true },
//   rewardsInUse: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RewardsInUse' }],
//   status: String,
//   joinedDate: Date,
//   lastUsedDate: Date,
// });

// const rewardSchema = new mongoose.Schema({
//   vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
//   vendorName: String,
//   rewardTitle: String,
//   rewardInfo: String,
//   rewardDescription: String,
//   rewardStamps: Number,
//   status: String,
// });

// const rewardsInUseSchema = new mongoose.Schema({
//   rewardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Reward' },
//   vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   rewardStamps: Number,
//   rewardStampsUsed: Number,
//   startedDate: Date,
//   lastUsed: Date,
// });

// export {
//   rewardSchema,
//   rewardsInUseSchema,
//   userSchema,
//   vendorSchema,
//   packageSchema,
// };
