import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const agentSchema = new Schema({
  name: String
});

export default model('Agent', agentSchema);
