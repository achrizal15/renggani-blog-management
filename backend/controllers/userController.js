import db from '../models/index.js';
import userCreateService from '../services/userCreateService.js'
import userUpdateService from '../services/userUpdateService.js';
import { NotFoundError } from '../utils/errors.js';
export const createUser = async (req, res, next) => {
        try {
                const data = req.body
                await userCreateService(data)
                res.status(200).json({
                        message: "Berhasil di create"
                });
        } catch (error) {
                next(error)
        }
}
export const getUsers = async (req, res, next) => {
        try {
                const users = await db.User.findAll({ attributes: { exclude: ['password', 'token'] } });
                res.status(200).json({
                        message: 'Success',
                        data: users
                });
        } catch (error) {
                next(error)
        }
};
export const getUserById = async (req, res, next) => {
        try {
                const id = req.params.id
                const user = await db.User.findByPk(id, {
                        attributes: { exclude: ['password', 'token'] }
                });
                if (!user) {
                        throw new NotFoundError('User not found');
                }
                res.status(200).json({
                        message: 'Success',
                        data: user
                });
        } catch (error) {
                next(error)
        }
};
export const updateUserById = async (req, res, next) => {
        try {
                const id = req.params.id
                const data = req.body
                const user = await userUpdateService(id, data)
                res.status(200).json({
                        message: 'Success Updated',
                        data: user
                });
        } catch (error) {
                next(error)
        }
};
export const deleteUser = async (req, res,next) => {
        try {
                const id = req.params.id
                const user = await db.User.findOne({ where: { id: id } });
                if (!user) {
                       throw new NotFoundError('User Not Found')
                }
                await user.destroy()
                res.status(200).json({
                        message: 'Success Delete',
                });
        } catch (error) {
                next(error)
        }
};
