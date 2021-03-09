const Joi = require('@hapi/joi');

const listSchema = Joi.object().keys({
  query: Joi.object().keys({
    page: Joi.number().required().min(1).not().empty().messages({
      'number.base': 'Invalid type, page must be a number.',
      'number.empty': 'page can not be empty.',
      'number.min': 'page can not be less than 1.'
    }),
    pageSize: Joi.number().optional().min(1).not().empty().messages({
      'number.base': 'Invalid type, pageSize must be a number.',
      'number.empty': 'pageSize can not be empty.',
      'number.min': 'pageSize can not be less than 1.'
    }),
    categoryId: Joi.number().optional().min(1).not().empty().messages({
      'number.base': 'Invalid type, categoryId must be a number.',
      'number.empty': 'categoryId can not be empty.',
      'number.min': 'categoryId can not be less than 1.'
    }),
    name: Joi.string().optional().not().empty().messages({
      'string.base': 'Invalid type, name must be a string.',
      'string.empty': 'name can not be empty.',
    }),
  })
});

const updateSchema = Joi.object().keys({
  params: Joi.object().keys({
    id: Joi.number().required().min(1).not().empty().messages({
      'number.base': 'Invalid type, id must be a number.',
      'number.empty': 'id can not be empty.',
      'number.min': 'id can not be less than 1.'
    }),
  }),
  query: Joi.object().keys({
    categoryId: Joi.number().optional().min(1).not().empty().messages({
      'number.base': 'Invalid type, categoryId must be a number.',
      'number.empty': 'categoryId can not be empty.',
      'number.min': 'categoryId can not be less than 1.'
    }),
    name: Joi.string().optional().not().empty().messages({
      'string.base': 'Invalid type, name must be a string.',
      'string.empty': 'name can not be empty.',
    }),
    image_uri: Joi.string().optional().not().empty().messages({
      'string.base': 'Invalid type, name must be a string.',
      'string.empty': 'name can not be empty.',
    }),
    is_featured: Joi.boolean().optional().not().empty(),
  })
});

module.exports = {
  listSchema,
  updateSchema
};
