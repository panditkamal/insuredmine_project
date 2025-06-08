import express from 'express';
import { searchUserPolicy, aggregatePolicies } from '../controllers/searchController.js';

const router = express.Router();

router.get('/search/:username', searchUserPolicy);
router.get('/aggregate', aggregatePolicies);

export default router;
