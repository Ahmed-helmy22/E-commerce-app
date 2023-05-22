import express from 'express';
import { globalErrorHandler } from './src/modules/globalError/globalErrorController.js';
import categoryRouter from './src/modules/category/categoryRouter.js';
import subCategoryRouter from './src/modules/subCategory/subCategoryRouter.js';
import brandRouter from './src/modules/brand/brandRouter.js';
import productRouter from './src/modules/product/productRouter.js';
import userRouter from './src/modules/user/userRouter.js';
import authRouter from './src/modules/auth/authRouter.js';
import reviewRouter from './src/modules/review/reviewRouter.js';
import wishListRouter from './src/modules/wishlist/wishlistRouter.js';
import addressRouter from './src/modules/address/addressRouter.js';
import couponRouter from './src/modules/coupon/couponRouter.js';
import cartRouter from './src/modules/cart/cartRouter.js';

import morgan from 'morgan';

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('dev'));

app.use('/categories', categoryRouter);
app.use('/subcategories', subCategoryRouter);
app.use('/brands', brandRouter);
app.use('/products', productRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/reviews', reviewRouter);
app.use('/wishList', wishListRouter);
app.use('/addresses', addressRouter);
app.use('/coupon', couponRouter);
app.use('/cart', cartRouter);

app.all('*', (req, res, next) =>
  res.status(404).json(`${req.originalUrl} is not exist`)
);
app.use(globalErrorHandler);

export default app;
