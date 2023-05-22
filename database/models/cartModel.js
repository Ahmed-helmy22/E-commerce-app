import mongoose from 'mongoose';

const cartSchema = mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    cartItem: [
      {
        product: { type: mongoose.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 },
        price: Number,
      },
    ],
    totalPrice: Number,
    totalPriceAfterDiscount: Number,
    discount: Number,
  },
  {
    timestamps: true,
  }
);

const CartModel = mongoose.model('Cart', cartSchema);
export default CartModel;
