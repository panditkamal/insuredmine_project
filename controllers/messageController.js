import ScheduledMessage from '../models/scheduledMessage.js';

export const scheduleMessage = async (req, res) => {
  const { message, day, time } = req.body;
  const dateTime = new Date(`${day}T${time}`);
  const msg = await ScheduledMessage.create({ message, scheduledFor: dateTime });
  res.json(msg);
};
