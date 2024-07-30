import db from '../models/index.js';
import userCreateService from '../services/userCreateService.js'
import deleteFileService from '../services/deleteFileService.js';
import userUpdateService from '../services/userUpdateService.js';
import validationResponse from "../utils/validationResponse.js";
import { NotFoundError } from '../utils/errors.js';
import { deleteFile, storeFile } from '../services/minioService.js';
export const createUser = async (req, res, next) => {
        try {
                const data = req.body
                data.image = req.file ? `public/images/${req.file.filename}` : null
                const { status, errors } = validationResponse(req, async (err) => {
                        deleteFileService(data.image)
                })
                if (status == 400) {
                        return res.status(status).json({ errors })
                }
                await userCreateService(data)
                return res.status(200).json({
                        message: "Berhasil di create"
                });
        } catch (error) {
                if (req.file) {
                        deleteFileService(`public/images/${req.file.filename}`)
                }
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
                const { status, errors } = validationResponse(req)
                if (status == 400) {
                        return res.status(status).json({ errors })
                }
                data.image = req.file ? await storeFile(req.file, "images/users") : null
                const user = await userUpdateService(id, data)
                res.status(200).json({
                        message: 'Success Updated',
                        data: user
                });
        } catch (error) {
                next(error)
        }
};
export const deleteUser = async (req, res, next) => {
        try {
                const id = req.params.id
                const user = await db.User.findOne({ where: { id: id } });
                if (!user) {
                        throw new NotFoundError('User Not Found')
                }
                deleteFileService(user.image)
                await user.destroy()
                res.status(200).json({
                        message: 'Success Delete',
                });
        } catch (error) {
                next(error)
        }
};
