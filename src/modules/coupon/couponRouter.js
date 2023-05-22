import express from 'express';
import * as couponController from './couponController.js';
import { protect } from '../auth/authController.js';

const router = express.Router();

router
  .route('/')
  .get(couponController.getAllCoupon)
  .post(protect, couponController.createCoupon);
router
  .route('/:id')
  .delete(couponController.deleteCoupon)
  .patch(protect, couponController.updatecoupon)
  .get(couponController.getcoupon);

export default router;
