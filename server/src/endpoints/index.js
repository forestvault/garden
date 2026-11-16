import { Router } from 'express';
import zoneRoute from './zone/index.js';
import deviceRoute from './device/index.js';
import plotRoute from './plot/index.js';

const router = Router();

router.use('/zone', zoneRoute);
router.use('/device', deviceRoute);
router.use('/plot', plotRoute);

export default router;