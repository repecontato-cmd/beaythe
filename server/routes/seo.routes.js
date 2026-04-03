import { Router } from 'express';
import { getUrls, syncSEO } from '../controllers/seo.controller.js';

const router = Router();

router.get('/urls', getUrls);
router.post('/sync', syncSEO);

export default router;
