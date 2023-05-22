import express from 'express';
import * as cartController from './cartController.js';
import { protect } from '../auth/authController.js';

const router = express.Router();

router.route('/').post(protect, cartController.addToCart);

export default router;
