import subCategoryModel from '../../../database/models/subCategoryModel.js';
import { AppErr } from '../../../utils/AppError.js';
import { catchAsync } from '../../../utils/catchAsync.js';
import * as factory from '../handlers/factoryhandler.js';
import slugify from 'slugify';

export const createSubCategory = catchAsync(async (req, res, next) => {
  const { name, category } = req.body;
  const result = new subCategoryModel({ name, category, slug: slugify(name) });
  await result.save();
  res.json({ status: 'success', data: { result } });
});

export const getAllSubCategories = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.categoryId) filter.category = req.params.categoryId;
  const result = await subCategoryModel.find(filter);
  !result.length && next(new AppErr('subcategory not found', 404));
  result.length && res.json({ status: 'success', data: { result } });
});

export const getSubCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await subCategoryModel.findById(id);
  !result && next(new AppErr('subcategory not found', 404));
  result && res.json({ status: 'success', data: { result } });
});

export const updateSubCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;
  const result = await subCategoryModel.findByIdAndUpdate(
    id,
    { name, category, slug: slugify(name) },
    { new: true }
  );
  !result && next(new AppErr('subcategory not found', 404));
  result && res.json({ status: 'success', data: { result } });
});

export const deleteSubCategory = factory.deleteOne(subCategoryModel);
