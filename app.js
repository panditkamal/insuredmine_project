import express from 'express';
import mongoose from 'mongoose';
import uploadRoutes from './routes/upload.js';
import searchRoutes from './routes/search.js';
import messageRoutes from './routes/message.js';
import dotenv from 'dotenv';
import('./models/init.js')
const app = express();
dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());
app.use('/api', uploadRoutes);
app.use('/api', searchRoutes);
app.use('/api', messageRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
