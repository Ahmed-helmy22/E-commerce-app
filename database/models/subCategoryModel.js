import mongoose from 'mongoose';

const subCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: [2, 'the min length of the subcategory is 2 chrachters'],
      //unique: [true, 'duplicate subcategory name is not allowed'],
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: 'Category',
    },
  },
  {
    timestamps: true,
  }
);

const subCategoryModel = mongoose.model('SubCategory', subCategorySchema);
export default subCategoryModel;
