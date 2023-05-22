import joi from 'joi';

export const createSubCategorySchema = joi.object({
  name: joi.string().min(2).max(30).required(),
  category: joi.string().hex().length(24).required(),
});

export const getSubCategorySchema = joi.object({
  id: joi.string().hex().length(24).required(),
});

export const updateSubCategorySchema = joi.object({
  id: joi.string().hex().length(24).required(),
  name: joi.string().min(2).max(30),
  category: joi.string().hex().length(24),
});

export const deleteSubCategorySchema = joi.object({
  id: joi.string().hex().length(24).required(),
});
