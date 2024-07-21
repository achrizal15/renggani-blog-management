import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../models/index.js';

export const login = async (username, password) => {
    // Cari user berdasarkan username
    const user = await db.User.findOne({ where: { username } });
    if (!user) {
        throw new Error('User not found');
    }

    // Verifikasi password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        throw new Error('Invalid password');
    }
    // Buat token JWT
    const accessToken = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

    return accessToken;
};
