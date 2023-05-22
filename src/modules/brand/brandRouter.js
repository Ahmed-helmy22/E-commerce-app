import express from 'express';
import * as brandController from './brandController.js';
import { validate } from '../middlewares/joiValidationMiddlware.js';
import {
  createBrandSchema,
  deleteBrandSchema,
  getBrandSchema,
  updateBrandSchema,
} from './brandValidtion.js';
import { fileUpload } from '../middlewares/fileUpload.js';
const router = express.Router();

router
  .route('/')
  .get(brandController.getAllBrands)
  .post(
    fileUpload('logo', 'brand'),
    validate(createBrandSchema),
    brandController.createBrand
  );
router
  .route('/:id')
  .delete(validate(deleteBrandSchema), brandController.deleteBrand)
  .patch(
    fileUpload('logo', 'brand'),
    validate(updateBrandSchema),
    brandController.updateBrand
  )
  .get(validate(getBrandSchema), brandController.getBrand);

export default router;
