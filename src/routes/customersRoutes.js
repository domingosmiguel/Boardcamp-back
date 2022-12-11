import { Router } from 'express';
import {
  customersGet,
  customersGetById,
  customersPost,
  customersPut,
} from '../controllers/customersController.js';
import customerMiddleware from '../middleware/customerMiddleware.js';

const router = Router();

router.get('/customers', customersGet);
router.get('/customers/:id', customersGetById);
router.post('/customers', customerMiddleware, customersPost);
router.put('/customers/:id', customerMiddleware, customersPut);

export default router;
