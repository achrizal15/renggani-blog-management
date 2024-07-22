import User from "../models/users.js"
import { NotFoundError } from "../utils/errors.js"
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
        user.image = data.image
        user.save()
        return user
}
export default userUpdateService