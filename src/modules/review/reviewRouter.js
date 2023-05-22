import express from 'express';
import * as reviewController from './reviewController.js';
import { protect } from '../auth/authController.js';

const router = express.Router();

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(protect, reviewController.createReview);
router
  .route('/:id')
  .delete(reviewController.deleteReview)
  .patch(protect, reviewController.updateReview)
  .get(reviewController.getReview);

export default router;
