import couponModel from '../../../database/models/couponModel.js';
import { ApiFeatures } from '../../../utils/ApiFeature.js';
import { AppErr } from '../../../utils/AppError.js';
import { catchAsync } from '../../../utils/catchAsync.js';
import * as factory from '../handlers/factoryhandler.js';
import qrcode from 'qrcode';
export const createCoupon = catchAsync(async (req, res, next) => {
  const result = new couponModel(req.body);
  await result.save();
  res.json({ status: 'success', data: { result } });
});

export const getAllCoupon = catchAsync(async (req, res, next) => {
  const apiFeatures = new ApiFeatures(couponModel.find(), req.query)
    .Find()
    .Paginate()
    .Sort()
    .Search()
    .Select();
  const result = await apiFeatures.query;
  !result.length && next(new AppErr('coupon not found', 404));
  result.length && res.json({ status: 'success', data: { result } });
});

export const getcoupon = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await couponModel.findById(id);
  const QqrCode = await qrcode.toDataURL(result.name);
  !result && next(new AppErr('coupon not found', 404));
  result && res.json({ status: 'success', data: { result, QqrCode } });
});

export const updatecoupon = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await couponModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  !result && next(new AppErr('you are not authorized to perform this', 404));
  result && res.json({ status: 'success', data: { result } });
});

export const deleteCoupon = factory.deleteOne(couponModel);
