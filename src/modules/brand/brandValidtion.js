import joi from 'joi';

export const createBrandSchema = joi.object({
  name: joi.string().min(2).max(30).required(),
  logo: joi.string().min(5).max(50),
});

export const getBrandSchema = joi.object({
  id: joi.string().hex().length(24).required(),
});

export const updateBrandSchema = joi.object({
  id: joi.string().hex().length(24).required(),
  name: joi.string().min(2).max(30),
  logo: joi.string().min(5).max(50),
});

export const deleteBrandSchema = joi.object({
  id: joi.string().hex().length(24).required(),
});
