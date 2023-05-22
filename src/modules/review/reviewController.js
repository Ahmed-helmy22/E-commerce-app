import reviewModel from '../../../database/models/reviewModel.js';
import { ApiFeatures } from '../../../utils/ApiFeature.js';
import { AppErr } from '../../../utils/AppError.js';
import { catchAsync } from '../../../utils/catchAsync.js';
import * as factory from '../handlers/factoryhandler.js';
export const createReview = catchAsync(async (req, res, next) => {
  req.body.user = req.user._id;
  const isReviewExist = await reviewModel.findOne({
    user: req.body.user,
    product: req.body.product,
  });
  if (isReviewExist)
    next(new AppErr('this already have a review to this product', 409));
  const result = new reviewModel(req.body);
  await result.save();
  res.json({ status: 'success', data: { result } });
});

export const getAllReviews = catchAsync(async (req, res, next) => {
  const apiFeatures = new ApiFeatures(reviewModel.find(), req.query)
    .Find()
    .Paginate()
    .Sort()
    .Search()
    .Select();
  const result = await apiFeatures.query;
  !result.length && next(new AppErr('review not found', 404));
  result.length && res.json({ status: 'success', data: { result } });
});

export const getReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await reviewModel.findById(id);
  !result && next(new AppErr('review not found', 404));
  result && res.json({ status: 'success', data: { result } });
});

export const updateReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await reviewModel.findOneAndUpdate(
    { _id: id, user: req.user._id },
    req.body,
    {
      new: true,
    }
  );
  !result && next(new AppErr('you are notauthorized to perform this', 404));
  result && res.json({ status: 'success', data: { result } });
});

export const deleteReview = factory.deleteOne(reviewModel);
