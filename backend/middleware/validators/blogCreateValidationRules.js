import { body } from 'express-validator';
import Blog from '../../models/blogs.js'
const blogCreateValidationRules = () => {
  return [
    body('title').notEmpty().isString().withMessage('Title is required and should be a string'),
    body('sub_title').notEmpty().isString().withMessage('Sub title is required and should be a string'),
    body('slug').notEmpty().isString().withMessage('Slug is required and should be a string')
      .custom(async (value) => {
        const blog = await Blog.findOne({ where: { slug: value } });
        if (blog) {
          throw new Error('Slug already in use');
        }
        return true;
      }),
    body('content').notEmpty().withMessage('Tidak Boleh Kosong')
      .isString().withMessage('Content harus berupa string').escape(),
    body('category').notEmpty().isString(),
    body('tags').notEmpty().withMessage('Tidak boleh kosong').isArray().withMessage('Harus array'),
  ];
};
export default blogCreateValidationRules