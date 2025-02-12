import { FileNotFoundError } from "../utils/errors.js";
import db from '../models/index.js'
const blogCreateService = async (data) => {
        const transaction = await db.sequelize.transaction()
        if (!data.thumbnail) {
                throw new FileNotFoundError('Thumbnail not found');
        }
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
        const blog = db.Blog.build()
        blog.title = data.title
        blog.slug = data.slug
        blog.sub_title = data.sub_title
        blog.content = data.content
        blog.thumbnail = data.thumbnail
        blog.created_by = data.user.id
        await blog.save({ transaction })

        await blog.setCategory(category, { transaction })
        await blog.setTags(tags, { transaction })
        await transaction.commit()
        return await db.Blog.findByPk(blog.id, {
                include: [
                        'category',
                        'tags',
                        {
                                model: db.User,
                                as: 'creator',
                                attributes: {
                                        exclude: ['token', 'last_login_at', 'password']
                                },
                        }
                ]
        })
}
export default blogCreateService