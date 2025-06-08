import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const lobSchema = new Schema({
  name: String
});

export default model('LOB', lobSchema);
