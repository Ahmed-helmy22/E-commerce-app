import mongoose from 'mongoose';

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: [2, 'the min length of the category is 2 cahrachters'],
      unique: [true, 'duplicate category name is not allowed'],
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    image: String,
  },
  {
    timestamps: true,
  }
);
categorySchema.post('init', (doc) => {
  doc.image = `${process.env.BASE_URL}/category/` + doc.image;
});
const categoryModel = mongoose.model('Category', categorySchema);
export default categoryModel;
