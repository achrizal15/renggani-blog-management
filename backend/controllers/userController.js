import db from '../models/index.js';

export const createUser = async (req, res) => {
        try {
                const data = req.body
                await db.User.create(data)
                res.status(200).json({
                        message: "Berhasil di create"
                });
        } catch (error) {
                return res.status(500).json(error)
        }
}
export const getUsers = async (req, res) => {
        try {
                const users = await db.User.findAll({ attributes: { exclude: ['password', 'token'] } });
                res.status(200).json({
                        message: 'Success',
                        data: users
                });
        } catch (error) {
                return res.status(500).json(error)
        }
};
export const getUserById = async (req, res) => {
        try {
                const id = req.params.id
                const users = await db.User.findByPk(id,{
                        attributes: { exclude: ['password', 'token'] }
                });
                res.status(200).json({
                        message: 'Success',
                        data: users
                });
        } catch (error) {
                return res.status(500).json(error)
        }
};
