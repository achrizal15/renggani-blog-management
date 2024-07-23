import User from "../models/users.js"
import { NotFoundError } from "../utils/errors.js"
import deleteFileService from './deleteFileService.js'
const userUpdateService = async (id, data) => {
        const user = await User.findByPk(id, {
                attributes: { exclude: ['password', 'token'] }
        });
        if (!user) {
                throw new NotFoundError('User Not Found')
        }
        user.username = data.username
        user.email = data.email
        user.name = data.name
        if (user.image != data.image && data.image != null) {
                deleteFileService(user.image)
                user.image = data.image
        }
        user.save()
        return user
}
export default userUpdateService