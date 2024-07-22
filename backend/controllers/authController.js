import User from '../models/users.js';
import { login } from '../services/authService.js';

export const loginController = async (req, res) => {
    const { username, password } = req.body;
    try {
        const accessToken = await login(username, password);
        res.status(200).json({
            message: 'Login berhasil',
            accessToken
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const logoutController = async (req, res) => {
    if (req.user) {
        const user =await User.findOne({
            where: {
                username: req.user.username
            }
        })
        user.token = null
        user.save()
    }
    res.status(200).json({
        message: 'Logout berhasil'
    });
}
