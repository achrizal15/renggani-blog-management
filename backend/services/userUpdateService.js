import User from "../models/users.js"
import { NotFoundError } from "../utils/errors.js"
import { deleteFile } from "./minioService.js";
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
                user.image = data.image
                await deleteFile(user.image)
        }
        user.save()
        return user
}
export default userUpdateService