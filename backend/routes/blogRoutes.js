import express from 'express';
import { createBlog, getBlogs,updateBlog } from '../controllers/blogController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import configureMulter from '../services/fileUploadService.js'
import blogCreateValidationRules from '../middleware/validators/blogCreateValidationRules.js';
import blogUpdateValidationRules from '../middleware/validators/blogUpdateValidationRules.js';
const router = express.Router();
const upload = configureMulter('public/images/blogs', ['image/png', 'image/webp'])
router.get('/blogs', verifyToken, getBlogs);
router.post('/blogs', [verifyToken, upload.single('thumbnail'),blogCreateValidationRules()], createBlog);
router.patch('/blogs/:id', [verifyToken, upload.single('thumbnail'),blogUpdateValidationRules()], updateBlog);

export default router;
