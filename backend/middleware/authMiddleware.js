import jwt from 'jsonwebtoken';
import User from '../models/users.js';
export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
        req.user = decoded;
        const user = await User.findOne({ where: { username: req.user.username } })
        if (user.token != token) {
            throw "Token doesnt match";
        }
        next();
    } catch (err) {
        console.log(err)
        res.status(401).json({ message: 'Invalid token' });
    }
};