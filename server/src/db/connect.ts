import mongoose from 'mongoose';

const connectMongoDB = async () => {
  try {
    console.log(process.env.MONGO_URI);

    const uri = process.env.MONGO_URI || '';
    await mongoose.connect(uri);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectMongoDB;
