import categoryModel from '../../../database/models/categoryModel.js';
import { ApiFeatures } from '../../../utils/ApiFeature.js';
import { AppErr } from '../../../utils/AppError.js';
import { catchAsync } from '../../../utils/catchAsync.js';
import * as factory from '../handlers/factoryhandler.js';
import slugify from 'slugify';

export const createCategory = catchAsync(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  if (req.file) req.body.image = req.file.filename;
  const result = new categoryModel(req.body);
  await result.save();
  res.json({ status: 'success', data: { result } });
});

export const getAllCategories = catchAsync(async (req, res, next) => {
  const apiFeatures = new ApiFeatures(categoryModel.find(), req.query)
    .Find()
    .Paginate()
    .Sort()
    .Search()
    .Select();
  const result = await apiFeatures.query;
  !result.length && next(new AppErr('category not found', 404));
  result.length && res.json({ status: 'success', data: { result } });
});

export const getCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await categoryModel.findById(id);
  !result && next(new AppErr('category not found', 404));
  result && res.json({ status: 'success', data: { result } });
});

export const updateCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.name) req.body.slug = slugify(req.body.name);
  if (req.file) req.body.image = req.file.filename;
  const result = await categoryModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  !result && next(new AppErr('category not found', 404));
  result && res.json({ status: 'success', data: { result } });
});

export const deleteCategory = factory.deleteOne(categoryModel);
