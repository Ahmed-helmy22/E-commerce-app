import cartModel from '../../../database/models/cartModel.js';
import { ApiFeatures } from '../../../utils/ApiFeature.js';
import { AppErr } from '../../../utils/AppError.js';
import { catchAsync } from '../../../utils/catchAsync.js';
import * as factory from '../handlers/factoryhandler.js';
export const addToCart = catchAsync(async (req, res, next) => {
  const isExist = await cartModel.findById({ user: req.user._id });
  if (!isExist) {
    const result = new cartModel({ user: req.user._id, cartItem: [req.body] });
    await result.save();
    return res.json({ status: 'success', data: { result } });
  }
  let item = isExist.cartItem.find((el) => el.product == req.body.product);
  if (item) item.quantity += 1;
  await isExist.save();
  return res.json({ status: 'success', data: { cart: isExist } });
});

// export const getAllCoupon = catchAsync(async (req, res, next) => {
//   const apiFeatures = new ApiFeatures(couponModel.find(), req.query)
//     .Find()
//     .Paginate()
//     .Sort()
//     .Search()
//     .Select();
//   const result = await apiFeatures.query;
//   !result.length && next(new AppErr('coupon not found', 404));
//   result.length && res.json({ status: 'success', data: { result } });
// });

// export const getcoupon = catchAsync(async (req, res, next) => {
//   const { id } = req.params;
//   const result = await couponModel.findById(id);
//   const QqrCode = await qrcode.toDataURL(result.name);
//   !result && next(new AppErr('coupon not found', 404));
//   result && res.json({ status: 'success', data: { result, QqrCode } });
// });

// export const updatecoupon = catchAsync(async (req, res, next) => {
//   const { id } = req.params;
//   const result = await couponModel.findByIdAndUpdate(id, req.body, {
//     new: true,
//   });
//   !result && next(new AppErr('you are not authorized to perform this', 404));
//   result && res.json({ status: 'success', data: { result } });
// });

// export const deleteCoupon = factory.deleteOne(couponModel);
