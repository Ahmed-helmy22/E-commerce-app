import userModel from '../../../database/models/userModel.js';
import { AppErr } from '../../../utils/AppError.js';
import { catchAsync } from '../../../utils/catchAsync.js';
import bcrypt from 'bcrypt';
import { promisify } from 'util';

import jwt from 'jsonwebtoken';
export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppErr('please enter email and password', 401));
  }

  const user = await userModel.findOne({ email });
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign(
        { userId: user.id, role: user.role, name: user.name },
        'ggggdgdgdgdgddjdjjd'
      );
      return res.status(200).json({ message: 'success', token });
    }

    next(new AppErr('inavlid email or password'), 400);
  }
});

export const signUp = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });
  if (user) next(new AppErr('this user is already exist', 400));
  const newUser = new userModel(req.body);
  await newUser.save();
  const token = jwt.sign(
    { userId: newUser.id, role: newUser.role, name: newUser.name },
    process.env.JWT_SECRET
  );

  return res.status(200).json({
    message: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

export const restrictTo =
  (...role) =>
  (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return next(new AppErr('you dont have the permission to do that ', 403));
    }
    return next();
  };

export const protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppErr('you have no access, please log in', 401));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  if (!decoded) {
    return next(new AppErr('you have no access, please log in', 401));
  }
  const freshUser = await userModel.findById(decoded.userId);

  if (!freshUser) {
    return next(new AppErr('the user of this token is no longer exist', 401));
  }

  if (freshUser.passwordChangedAt) {
    const passwordChangeInSec = parseInt(
      freshUser.passwordChangedAt.getTime() / 1000
    );
    if (passwordChangeInSec > decoded.iat)
      return next(new AppErr('the token is not valid sign in again', 401));
  }

  req.user = freshUser;
  next();
});
