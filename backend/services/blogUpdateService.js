
import db from '../models/index.js'
import { deleteFile, getFileUrl } from './minioService.js'
const blogUpdateService = async (id, data) => {
        const transaction = await db.sequelize.transaction()
     
        const [category] = await db.Category.findOrCreate({
                where: { name: data.category },
                transaction
        })
        const tags = await Promise.all(data.tags.map(async (tagName) => {
                const [tag] = await db.Tag.findOrCreate({
                        attributes: ['id'],
                        where: { name: tagName },
                        transaction
                })
                return tag;
        }))
        
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
        
        blog.title = data.title
        blog.slug = data.slug
        blog.sub_title = data.sub_title
        blog.content = data.content
        if (blog.thumbnail != data.thumbnail && data.thumbnail != null) {
                blog.thumbnail = data.thumbnail
                await deleteFile(blog.thumbnail)
        }
        blog.updated_by = data.user.id
        await blog.setCategory(category, { transaction })
        await blog.setTags(tags, { transaction })
        await blog.save({ transaction })
        await transaction.commit()
        await blog.reload()
        blog.thumbnail = getFileUrl(blog.thumbnail)
        return blog
}
export default blogUpdateService