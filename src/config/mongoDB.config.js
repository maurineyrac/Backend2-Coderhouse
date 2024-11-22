import mongoose from 'mongoose';
import 'dotenv/config'

const mongoURI = process.env.MONGO_URI

export const connectMongoDB =  async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.log('MongoDB Connection Error: ', error);
    }
}