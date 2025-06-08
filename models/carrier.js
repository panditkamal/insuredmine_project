import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const carrierSchema = new Schema({
  name: String
});

export default model('Carrier', carrierSchema);
