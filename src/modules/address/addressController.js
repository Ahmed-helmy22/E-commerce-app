import userModel from '../../../database/models/userModel.js';
import { AppErr } from '../../../utils/AppError.js';
import { catchAsync } from '../../../utils/catchAsync.js';

export const addAddress = catchAsync(async (req, res, next) => {
  const result = await userModel.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { address: req.body } },
    {
      new: true,
    }
  );
  !result && next(new AppErr('nodaddresses yet', 401));
  result && res.json({ status: 'success', data: { result: result.address } });
});

export const deleteAddress = catchAsync(async (req, res, next) => {
  const result = await userModel.findByIdAndDelete(
    req.user._id,
    { $pull: { address: req.body } },
    {
      new: true,
    }
  );
  !result && next(new AppErr('you have no addresses', 401));
  result && res.json({ status: 'success', data: { result } });
});

export const getAllAddresse = catchAsync(async (req, res, next) => {
  const result = await userModel.findById(req.user._id).select(address);
  !result && next(new AppErr('you have no  addresses yet', 401));
  result && res.json({ status: 'success', data: { result: result } });
});
