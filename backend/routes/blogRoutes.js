import express from 'express';
import { createBlog, getBlogs } from '../controllers/blogController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import configureMulter from '../services/fileUploadService.js'
import blogCreateValidationRules from '../middleware/validators/blogCreateValidationRules.js';
const router = express.Router();
const upload = configureMulter('public/images/blogs', ['image/png', 'image/webp'])
router.get('/blogs', verifyToken, getBlogs);
router.post('/blogs', [verifyToken, upload.single('thumbnail'),blogCreateValidationRules()], createBlog);

export default router;
