import mongoose from 'mongoose';

const couponSchema = mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, 'coupon code is required'],
      trim: true,
      minLength: [2, 'too short coupon'],
    },
    discount: {
      type: Number,
      min: 0,
      required: [true, 'discount of the coupon is required'],
    },
    expires: {
      type: Date,
      required: [true, 'expiration date  of the coupon is required'],
    },
  },
  {
    timestamps: true,
  }
);

const couponModel = mongoose.model('Coupon', couponSchema);
export default couponModel;
