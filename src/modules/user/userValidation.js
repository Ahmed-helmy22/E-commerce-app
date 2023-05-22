import joi from 'joi';

export const createCategorySchema = joi.object({
  name: joi.string().min(2).max(30).required(),
});

export const getCategorySchema = joi.object({
  id: joi.string().hex().length(24).required(),
});

export const updateCategorySchema = joi.object({
  id: joi.string().hex().length(24).required(),
  name: joi.string().min(2).max(30),
  image: joi.string().min(10),
});

export const deleteCategorySchema = joi.object({
  id: joi.string().hex().length(24).required(),
});
