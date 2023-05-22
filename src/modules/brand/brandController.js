import brandModel from '../../../database/models/brandModel.js';
import { ApiFeatures } from '../../../utils/ApiFeature.js';
import { AppErr } from '../../../utils/AppError.js';
import { catchAsync } from '../../../utils/catchAsync.js';
import * as factory from '../handlers/factoryhandler.js';
import slugify from 'slugify';

export const createBrand = catchAsync(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  if (req.file) req.body.logo = req.file.filename;
  const result = new brandModel(req.body);
  await result.save();
  res.json({ status: 'success', data: { result } });
});

export const getAllBrands = catchAsync(async (req, res, next) => {
  const apiFeatures = new ApiFeatures(brandModel.find(), req.query)
    .Find()
    .Paginate()
    .Sort()
    .Search()
    .Select();
  const result = await apiFeatures.query;
  !result.length && next(new AppErr('brand not found', 404));
  result.length && res.json({ status: 'success', data: { result } });
});

export const getBrand = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await brandModel.findById(id);
  !result && next(new AppErr('brand not found', 404));
  result && res.json({ status: 'success', data: { result } });
});

export const updateBrand = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.name) req.body.slug = slugify(req.body.name);
  if (req.file) req.body.logo = req.file.filename;
  const result = await brandModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  !result && next(new AppErr('brand not found', 404));
  result && res.json({ status: 'success', data: { result } });
});

export const deleteBrand = factory.deleteOne(brandModel);
