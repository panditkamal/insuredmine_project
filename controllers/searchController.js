import mongoose from 'mongoose';
import User from '../models/user.js';
import Policy from '../models/policy.js';

export const searchUserPolicy = async (req, res) => {
  const { username } = req.params;

  try {
     const user = await User.findOne({ firstName: username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

     const policies = await Policy.find({ userId: user._id })
      .populate('agentId', 'name')
      .populate('accountId', 'accountName address city state zip')
      .populate('lobId', 'name')
      .populate('companyId', 'name');

    return res.json({ user, policies });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const aggregatePolicies = async (req, res) => {
 try {
    const aggregation = await Policy.aggregate([
      {
        $group: {
          _id: '$userId',
          totalPolicies: { $sum: 1 },
          totalPremium: { $sum: '$premiumAmount' },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
      {
        $project: {
          _id: 0,
          userId: '$_id',
          userName: '$user.firstName',
          totalPolicies: 1,
          totalPremium: 1,
        },
      },
    ]);

    return res.json(aggregation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};
