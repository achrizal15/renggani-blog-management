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
