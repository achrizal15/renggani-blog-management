import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import userCreateValidationRules from '../middleware/validators/userCreateValidationRules.js'
import userUpdateValidationRules from '../middleware/validators/userUpdateValidationRules.js';
import { createUser, getUsers, getUserById, deleteUser, updateUserById } from '../controllers/userController.js'
import configureMulter from '../services/fileUploadService.js'
import multer from 'multer';
const router = express.Router();
const upload = configureMulter('public/images', ['image/png'])
const uploads = multer({ storage: multer.memoryStorage() });
router.get('/users', [verifyToken], getUsers);
router.get('/users/:id', [verifyToken], getUserById);
router.delete('/users/:id', [verifyToken], deleteUser);
router.patch('/users/:id', [
        verifyToken, 
        uploads.single('image'),
        userUpdateValidationRules()
], updateUserById);
router.post('/users', [
        verifyToken,
        upload.single('image'),
        userCreateValidationRules()
], createUser);

export default router;
