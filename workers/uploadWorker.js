import { parentPort, workerData } from 'worker_threads';
import csvParser from 'csv-parser';
import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import Agent from '../models/agent.js';
import User from '../models/user.js';
import UserAccount from '../models/account.js';
import LOB from '../models/lob.js';
import Carrier from '../models/carrier.js';
import Policy from '../models/policy.js';

dotenv.config();
const MONGO_URI = process.env.MONGODB_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const results = [];
fs.createReadStream(workerData.filePath)
  .pipe(csvParser())
  .on('data', (row) => results.push(row))
  .on('end', async () => {
    for (const row of results) {
      try {
        let agent = await Agent.findOne({ name: row.agent });
        if (!agent) agent = await Agent.create({ name: row.agent });

        let user = await User.findOne({ email: row.email });
        if (!user) {
          user = await User.create({
            firstName: row.firstname,
            dob: new Date(row.dob),
            phone: row.phone,
            email: row.email,
          });
        }

        let account = await UserAccount.findOne({ userId: user._id });
        if (!account) {
          account = await UserAccount.create({
            userId: user._id,
            accountName: row.account_name,
            address: row.address,
            city: row.city,
            state: row.state,
            zip: row.zip,
          });
        }

        let lob = await LOB.findOne({ name: row.category_name });
        if (!lob) lob = await LOB.create({ name: row.category_name });

        let carrier = await Carrier.findOne({ name: row.company_name });
        if (!carrier) carrier = await Carrier.create({ name: row.company_name });

        await Policy.create({
          policyNumber: row.policy_number,
          policyMode: Number(row.policy_mode),
          premiumAmount: Number(row.premium_amount),
          policyType: row.policy_type,
          producer: row.producer,
          startDate: row.policy_start_date,
          endDate: row.policy_end_date,
          userId: user._id,
          accountId: account._id,
          lobId: lob._id,
          companyId: carrier._id,
          agentId: agent._id,
        });
      } catch (err) {
        console.error('Error processing row:', err.message);
      }
    }

    parentPort.postMessage({ status: 'done' });
  });
