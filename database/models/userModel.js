import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'user name is required'],
      trim: true,
      minLength: [2, 'too short user name'],
    },
    email: {
      type: String,
      trim: true,
      required: [true, 'email is required'],
      minLength: [2, 'too short email'],
      unique: [true, ' email must be unique'],
    },
    passwordChangedAt: Date,
    password: {
      type: String,
      required: [true, 'password is required'],
      minLength: [8, 'min length of the password is 8 characters'],
      maxLength: [30, 'too long password'],
    },
    phone: {
      type: String,
      required: [true, 'phone number is required'],
    },
    profilePic: String,
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    address: {
      city: String,
      street: String,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 5);
  next();
});

userSchema.pre('findByIdAndUpdate', async function (next) {
  if (this._update.password)
    this._update.password = await bcrypt.hash(this._update.password, 5);
  next();
});
const userModel = mongoose.model('User', userSchema);
export default userModel;
