import express from 'express';
import * as subCategoryController from './subCategoryController.js';
import { validate } from '../middlewares/joiValidationMiddlware.js';
import {
  createSubCategorySchema,
  deleteSubCategorySchema,
  getSubCategorySchema,
  updateSubCategorySchema,
} from './subCategortValidation.js';
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(subCategoryController.getAllSubCategories)
  .post(
    validate(createSubCategorySchema),
    subCategoryController.createSubCategory
  );
router
  .route('/:id')
  .delete(
    validate(deleteSubCategorySchema),
    subCategoryController.deleteSubCategory
  )
  .patch(
    validate(updateSubCategorySchema),
    subCategoryController.updateSubCategory
  )
  .get(validate(getSubCategorySchema), subCategoryController.getSubCategory);

export default router;
