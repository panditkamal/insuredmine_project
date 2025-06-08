import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const scheduledMessageSchema = new Schema({
  message: String,
  scheduledFor: Date
});

export default model('ScheduledMessage', scheduledMessageSchema);
