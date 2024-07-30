import validationResponse from "../utils/validationResponse.js";
import blogReleaseService from "../services/blogReleaseService.js"
import blogCreateService from "../services/blogCreateService.js";
import blogUpdateService from "../services/blogUpdateService.js";
import { deleteFile, getFileUrl, storeFile } from "../services/minioService.js"
import db from "../models/index.js";
export const getBlogs = async (req, res) => {
    const blogs = await db.Blog.findAll();
    res.status(200).json({
        data: blogs.map(item => {
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
        const { status, errors } = validationResponse(req)
        if (status) {
            return res.status(status).json({ errors })
        }
        data.thumbnail = req.file ? await storeFile(req.file, "images/blogs") : null
        const blog = await blogUpdateService(req.params.id, data);
        return res.status(201).json({
            message: 'Berhasil update blog',
            data: blog
        })
    } catch (error) {
        next(error)
    }
}
export const releaseBlog = async (req, res, next) => {
    try {
        const data = req.body
        data.user = req.user
        const blog = await blogReleaseService(req.params.id, data);
        return res.status(201).json({
            message: 'Berhasil released blog',
            data: blog
        })
    } catch (error) {
        next(error)
    }
}
export const deleteBlog = async (req, res, next) => {
    try {
            const id = req.params.id
            const blog = await db.Blog.findOne({ where: { id: id } });
            if (!blog) {
                    throw new NotFoundError('Blog Not Found')
            }
            await deleteFile(blog.thumbnail)
            await blog.destroy()
            res.status(200).json({
                    message: 'Success Delete',
            });
    } catch (error) {
            next(error)
    }
};