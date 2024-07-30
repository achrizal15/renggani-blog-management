import validationResponse from "../utils/validationResponse.js";
import deleteFileService from "../services/deleteFileService.js"
import blogCreateService from "../services/blogCreateService.js";
import blogUpdateService from "../services/blogUpdateService.js";
import {getFileUrl, storeFile} from "../services/minioService.js"
import db from "../models/index.js";
export const getBlogs =async (req, res) => {
    const blogs = await db.Blog.findAll();
    res.status(200).json({
        data: blogs.map(item=>{
            item.thumbnail = getFileUrl(item.thumbnail)
            return item
        })
    });
};
export const createBlog = async (req, res, next) => {
    try {
        const data = req.body
        data.user = req.user
        const { status, errors } = validationResponse(req)
        if (status) {
            return res.status(status).json({ errors })
        }
        data.thumbnail = req.file ? await storeFile(req.file, "images/blogs") : null
        const blog = await blogCreateService(data);
        blog.thumbnail = getFileUrl(blog.thumbnail)
        return res.status(201).json({
            message: 'Berhasil membuat blog',
            data: blog
        })
    } catch (error) {
        next(error)
    }
}
export const updateBlog = async (req, res, next) => {
    try {
        const data = req.body
        data.user = req.user
        data.thumbnail = req.file ? `public/images/blogs/${req.file?.filename}` : null
        const { status, errors } = validationResponse(req, (err) => {
            deleteFileService(data.thumbnail)
        })
        if (status) {
            return res.status(status).json({ errors })
        }
        const blog = await blogUpdateService(req.params.id, data);
        return res.status(201).json({
            message: 'Berhasil update blog',
            data: blog
        })
    } catch (error) {
        if (req.file) {
            deleteFileService(`public/images/blogs/${req.file?.filename}`)
        }
        next(error)
    }
}