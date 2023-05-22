import userModel from '../../../database/models/userModel.js';
import { AppErr } from '../../../utils/AppError.js';
import { catchAsync } from '../../../utils/catchAsync.js';

export const addToWishlist = catchAsync(async (req, res, next) => {
  const { product } = req.params;
  const result = await userModel.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { wishList: product } },
    {
      new: true,
    }
  );
  !result && next(new AppErr('you have no wish list', 401));
  result && res.json({ status: 'success', data: { result } });
});

export const deleteFromWishlist = catchAsync(async (req, res, next) => {
  const { product } = req.params;
  const result = await userModel.findByIdAndUpdate(
    req.user._id,
    { $pull: { wishList: product } },
    {
      new: true,
    }
  );
  !result && next(new AppErr('you have no wish list', 401));
  result && res.json({ status: 'success', data: { result } });
});

export const getUserFromWishlist = catchAsync(async (req, res, next) => {
  const result = await userModel.findById(req.user._id).populate('wishList');
  !result && next(new AppErr('you have no wish list', 401));
  result && res.json({ status: 'success', data: { result: result.wishList } });
});
