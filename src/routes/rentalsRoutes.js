import { Router } from 'express';
import {
  rentalsDelete,
  rentalsGet,
  rentalsPost,
  rentalsPostReturn,
} from '../controllers/rentalsController.js';
import newRentalMiddleware from '../middleware/newRentalMiddleware.js';

const router = Router();

router.get('/rentals', rentalsGet);
router.post('/rentals', newRentalMiddleware, rentalsPost);
router.post('/rentals/:id/return', rentalsPostReturn);
router.delete('/rentals/:id', rentalsDelete);

export default router;
