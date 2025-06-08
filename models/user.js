import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstName: String,
  dob: Date,
  phone: String,
  email: String
});

export default model('User', userSchema);
