import express from 'express';
import { loginController,logoutController } from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/login', loginController);
router.get('/logout',verifyToken, logoutController);

export default router;
