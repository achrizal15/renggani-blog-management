import { body } from 'express-validator';
import User from '../../models/users.js';
const userUpdateValidationRules = () => {
  return [
    body('name').isString().notEmpty().withMessage('Name is required and should be a string'),
    body('username').isString().notEmpty()
      .withMessage('Username is required and should be a string')
      .custom(async (value, { req }) => {
        const userId = req.params.id
        const user = await User.findOne({ where: { username: value } });
        if (user) {
          if (user.id != userId) {
            throw new Error('Username already in use');
          }
        }
        return true;
      }),
    body('image').optional().isString().withMessage('Image should be a string'),
    body('email').isEmail().withMessage('Email is required and should be a valid email address')
      .custom(async (value, { req }) => {
        const userId = req.params.id
        const user = await User.findOne({ where: { email: value } });
        if (user) {
          if (user.id != userId) {
            throw new Error('Email already in use')
          }
        }
        return true;
      }),
    body('password').isString().notEmpty().withMessage('Password is required and should be a string'),
    body('token').optional().isString().withMessage('Token should be a string'),
    body('last_login_at').optional().isISO8601().withMessage('Last login date should be a valid date'),
  ];
};
export default userUpdateValidationRules