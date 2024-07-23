
import db from '../models/index.js'
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
        if (data.thumbnail != null && blog.thumbnail != data.thumbnail) {
                deleteFileService(user.image)
                blog.thumbnail = data.thumbnail
        }
        blog.updated_by = data.user.id
        await blog.setCategory(category, { transaction })
        await blog.setTags(tags, { transaction })
        await blog.save({ transaction })
        await transaction.commit()
        return await blog.reload()
}
export default blogUpdateService