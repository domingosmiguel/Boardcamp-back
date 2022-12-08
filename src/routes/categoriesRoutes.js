import { Router } from 'express';
import {
  categoriesGet,
  categoriesPost,
} from '../controllers/categoriesController.js';

const router = Router();

router.get('/categories', categoriesGet);
router.post('/categories', categoriesPost);

export default router;
