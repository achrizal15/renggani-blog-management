import validationResponse from "../utils/validationResponse.js";
import deleteFileService from "../services/deleteFileService.js"
import blogCreateService from "../services/blogCreateService.js";
import blogUpdateService from "../services/blogUpdateService.js";
export const getBlogs = (req, res) => {
    // Example: retrieve blogs from database (mock data used here)
    const blogs = [
        { id: 1, title: 'First Blog', content: 'This is the first blog post.' },
        { id: 2, title: 'Second Blog', content: 'This is the second blog post.' }
    ];
    res.status(200).json(blogs);
};
export const createBlog = async (req, res, next) => {
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
        const blog = await blogCreateService(data);
        return res.status(201).json({
            message: 'Berhasil membuat blog',
            data: blog
        })
    } catch (error) {
        if (req.file) {
            deleteFileService(`public/images/blogs/${req.file?.filename}`)
        }
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