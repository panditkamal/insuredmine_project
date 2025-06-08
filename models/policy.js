import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const policySchema = new Schema({
  policyNumber: String,
  policyMode: Number,
  premiumAmount: Number,
  policyType: String,
  companyId: { type: Schema.Types.ObjectId, ref: 'Carrier' },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  accountId: { type: Schema.Types.ObjectId, ref: 'UserAccount' },
  lobId: { type: Schema.Types.ObjectId, ref: 'LOB' },
  agentId: { type: Schema.Types.ObjectId, ref: 'Agent' },
  startDate: { type: Date },
  endDate: { type: Date },
  producer: String
});

export default model('Policy', policySchema);
