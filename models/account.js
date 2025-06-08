import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userAccountSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  accountName: String,
  address: String,
  city: String,
  state: String,
  zip: String
});

export default model('UserAccount', userAccountSchema);
