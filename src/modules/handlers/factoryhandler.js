import { AppErr } from '../../../utils/AppError.js';
import { catchAsync } from '../../../utils/catchAsync.js';

export const deleteOne = (model) => {
  return catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const result = await model.findByIdAndDelete(id);
    !result && next(new AppErr('document not found', 404));
    result && res.json({ status: 'success', data: { result } });
  });
};
