import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, 'review text is required'],
      trim: true,
      minLength: [2, 'too short review'],
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: 'Product',
      required: [true, 'product id is required'],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'user id is required'],
    },
    ratings: {
      type: Number,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate('user', 'name -_id');
});

const reviewModel = mongoose.model('Review', reviewSchema);
export default reviewModel;
