import { ApiFeatures } from '../../../utils/ApiFeature.js';
import { AppErr } from '../../../utils/AppError.js';
import { catchAsync } from '../../../utils/catchAsync.js';
import * as factory from '../handlers/factoryhandler.js';
import userModel from '../../../database/models/userModel.js';
export const createUser = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });
  if (user) return next(new AppErr('this user is aready exist', 409));
  const result = new userModel(req.body);
  await result.save();
  res.json({ status: 'success', data: { result } });
});

export const getAllUsers = catchAsync(async (req, res, next) => {
  const apiFeatures = new ApiFeatures(userModel.find(), req.query)
    .Find()
    .Paginate()
    .Sort()
    .Search()
    .Select();
  const result = await apiFeatures.query;
  !result.length && next(new AppErr('users not found', 404));
  result.length && res.json({ status: 'success', data: { result } });
});

export const getUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await userModel.findById(id);
  !result && next(new AppErr('user not found', 404));
  result && res.json({ status: 'success', data: { result } });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await userModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  !result && next(new AppErr('user not found', 404));
  result && res.json({ status: 'success', data: { result } });
});

export const updateUserPassword = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  req.body.passwordChangedAt = Date.now();
  const result = await userModel.findByIdAndUpdate(id, req.body.password, {
    new: true,
  });
  !result && next(new AppErr('user not found', 404));
  result && res.json({ status: 'success', data: { result } });
});

export const deleteUser = factory.deleteOne(userModel);
