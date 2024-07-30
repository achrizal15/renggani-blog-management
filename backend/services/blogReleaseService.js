import db from '../models/index.js'
import { NotFoundError } from '../utils/errors.js'
import { getFileUrl } from './minioService.js'
const blogReleaseService = async (id, data) => {
        const transaction = await db.sequelize.transaction()
        const blog = await db.Blog.findByPk(id, {
                transaction,
                include: [
                        'category',
                        'tags',
                        {
                                model: db.User,
                                as: 'updater',
                                attributes: {
                                        exclude: ['token', 'last_login_at', 'password']
                                },
                        }
                ]
        })
        if(!blog){
                throw new NotFoundError('Blog Not Found')
        }
        const now = new Date();
        blog.status = 'released'
        blog.released_by = data.user.id
        blog.released_at = now
        await blog.save({ transaction })
        blog.thumbnail = getFileUrl(blog.thumbnail)
        return blog
}
export default blogReleaseService