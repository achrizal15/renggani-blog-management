import express from 'express';
import { getBlogs } from '../controllers/blogController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/blogs', verifyToken, getBlogs);

export default router;
