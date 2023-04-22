import express from 'express';
import { crawlRepo } from '../controllers/crawlController.js';

const router = express.Router();

router.get('/crawl', crawlRepo);

export default router;
