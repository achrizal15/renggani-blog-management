import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import validationMiddleware from '../middleware/validationMiddleware.js'
import userCreateValidationRules from '../middleware/validators/userCreateValidationRules.js'
import userUpdateValidationRules from '../middleware/validators/userUpdateValidationRules.js';
import { createUser, getUsers, getUserById, deleteUser, updateUserById } from '../controllers/userController.js'

const router = express.Router();

router.get('/users', [verifyToken], getUsers);
router.get('/users/:id', [verifyToken], getUserById);
router.delete('/users/:id', [verifyToken], deleteUser);
router.patch('/users/:id', [verifyToken, userUpdateValidationRules(), validationMiddleware], updateUserById);
router.post('/users', [verifyToken, userCreateValidationRules(), validationMiddleware], createUser);

export default router;
