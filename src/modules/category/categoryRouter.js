import express from 'express';
import subCategoryRouter from '../subCategory/subCategoryRouter.js';
import * as categoryController from './categoryController.js';
import { validate } from '../middlewares/joiValidationMiddlware.js';
import {
  createCategorySchema,
  deleteCategorySchema,
  getCategorySchema,
  updateCategorySchema,
} from './categoryValidation.js';
import { fileUpload } from '../middlewares/fileUpload.js';

const router = express.Router();

router.use('/:categoryId/subcategory', subCategoryRouter);
router
  .route('/')
  .get(categoryController.getAllCategories)
  .post(
    fileUpload('image', 'category'),
    validate(createCategorySchema),
    categoryController.createCategory
  );
router
  .route('/:id')
  .delete(validate(deleteCategorySchema), categoryController.deleteCategory)
  .patch(
    fileUpload('image', 'category'),
    validate(updateCategorySchema),
    categoryController.updateCategory
  )
  .get(validate(getCategorySchema), categoryController.getCategory);

export default router;
