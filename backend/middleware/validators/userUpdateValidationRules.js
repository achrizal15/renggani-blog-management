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
  ];
};
export default userUpdateValidationRules