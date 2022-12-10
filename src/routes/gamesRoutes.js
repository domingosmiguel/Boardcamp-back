import { Router } from 'express';
import { gamesGet, gamesPost } from '../controllers/gamesController.js';
import newGameMiddleware from '../middleware/newGameMiddleware.js';

const router = Router();

router.get('/games', gamesGet);
router.post('/games', newGameMiddleware, gamesPost);

export default router;
