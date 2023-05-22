import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: [2, 'the min length of the product is 2 chrachters'],
      unique: [true, 'duplicate product name is not allowed'],
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    price: {
      type: Number,
      required: [true, 'price is required'],
      min: [0, 'not valid price'],
    },
    priceAfterDiscount: {
      type: Number,
      min: [0, 'not valid price after discount'],
    },
    ratingAverage: {
      type: Number,
      min: 1,
      max: 5,
    },
    ratingQuantity: {
      type: Number,
      default: 0,
      min: 0,
    },
    description: {
      type: String,
      minLength: [5, 'too short description'],
      maxLength: [200, 'too long description'],
      required: [true, 'the description of the product is required'],
      trim: true,
    },
    quantity: {
      type: Number,
      min: 0,
      required: [true, 'quantity of the product is required'],
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
      min: 0,
    },
    images: [String],
    imageCover: String,
    category: {
      type: mongoose.Types.ObjectId,
      ref: 'Category',
      required: [true, 'category of the product is required'],
    },
    subCategory: {
      type: mongoose.Types.ObjectId,
      ref: 'SubCategory',
      required: [true, 'subCategory of the product is required'],
    },
    brand: {
      type: mongoose.Types.ObjectId,
      ref: 'Brand',
      required: [true, 'brand of the product is required'],
    },
    wishList: [{ type: mongoose.Types.ObjectId, ref: 'Product' }],
  },
  {
    timestamps: true,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
productSchema.post('init', (doc) => {
  doc.imageCover = `${process.env.BASE_URL}/product/` + doc.imageCover;
  doc.images = doc.images.map((el) => `${process.env.BASE_URL}/product/${el}`);
});
productSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
});

productSchema.pre(/^find/, function (next) {
  this.populate('reviews', 'comment user');
});
const sproductModel = mongoose.model('Product', productSchema);
export default sproductModel;
