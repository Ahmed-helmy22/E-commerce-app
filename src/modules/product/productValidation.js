import joi from 'joi';

export const createProductSchema = joi.object({
  name: joi.string().min(2).max(30).required(),
  price: joi.number().min(0).required(),
  priceAfterDiscount: joi.number().min(0),
  description: joi.string().min(2).max(250).required(),
  quantity: joi.number().min(1).required(),
  imageCover: joi.string().min(2).max(50),
  images: joi.array(),
  category: joi.string().hex().length(24).required(),
  subCategory: joi.string().hex().length(24).required(),
  brand: joi.string().hex().length(24).required(),
});

export const getProductSchema = joi.object({
  id: joi.string().hex().length(24).required(),
});

export const updateProductSchema = joi.object({
  id: joi.string().hex().length(24).required(),
  name: joi.string().min(2).max(30),
  price: joi.number().min(0),
  priceAfterDiscount: joi.number().min(0),
  description: joi.string().min(2).max(250),
  quantity: joi.number().min(1),
  image: joi.string().min(2).max(50),
  imageCover: joi.array(),
  category: joi.string().hex().length(24),
  subCategory: joi.string().hex().length(24),
  brand: joi.string().hex().length(24),
});

export const deleteProductSchema = joi.object({
  id: joi.string().hex().length(24).required(),
});
