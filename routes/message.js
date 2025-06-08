import express from 'express';
import { scheduleMessage } from '../controllers/messageController.js';

const router = express.Router();
router.post('/schedule', scheduleMessage);

export default router;
