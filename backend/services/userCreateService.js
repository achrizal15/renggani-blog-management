import User from "../models/users.js"

const userCreateService = async (data) => {
        const user = await User.create(data);
        return user
}
export default userCreateService