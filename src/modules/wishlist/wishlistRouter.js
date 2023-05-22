import express from 'express';
import * as wishListController from './wishlistController.js';
import { protect } from '../auth/authController.js';

const router = express.Router();

router.route('/').get(wishListController.getUserFromWishlist);
router
  .route('/:product')
  .delete(protect, wishListController.deleteFromWishlist)
  .patch(protect, wishListController.addToWishlist);

export default router;
