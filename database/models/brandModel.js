import mongoose from 'mongoose';

const brandSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'brand name is required'],
      trim: true,
      minLength: [2, 'too short brand name'],
      unique: [true, 'duplicate brand name is not allowed'],
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    logo: String,
  },
  {
    timestamps: true,
  }
);
brandSchema.post('init', (doc) => {
  doc.logo = `${process.env.BASE_URL}/brand/` + doc.logo;
});
const brandModel = mongoose.model('Brand', brandSchema);
export default brandModel;
