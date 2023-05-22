import express from 'express';
import * as addressController from './addressController.js';
import { protect } from '../auth/authController.js';

const router = express.Router();

router.route('/').get(addressController.getAllAddresse);
router
  .route('/')
  .delete(protect, addressController.deleteAddress)
  .patch(protect, addressController.addAddress);

export default router;
