import express from 'express';
import { createBlog, getBlogs, updateBlog, releaseBlog } from '../controllers/blogController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import blogCreateValidationRules from '../middleware/validators/blogCreateValidationRules.js';
import blogUpdateValidationRules from '../middleware/validators/blogUpdateValidationRules.js';
import multer from 'multer';
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() })
router.get('/blogs', verifyToken, getBlogs);
router.get('/blogs', verifyToken, getBlogs);
router.patch('/blogs/:id/release', [verifyToken], releaseBlog)
router.post('/blogs', [verifyToken, upload.single('thumbnail'), blogCreateValidationRules()], createBlog);
router.patch('/blogs/:id', [verifyToken, upload.single('thumbnail'), blogUpdateValidationRules()], updateBlog);

export default router;
