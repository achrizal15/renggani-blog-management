import db from '../models/index.js';

export const createUser = async (req, res) => {
        try {
                const data = req.body
                await db.User.create(data)
                res.status(200).json({
                        message: "Berhasil di create"
                });
        } catch (error) {
                console.log(error)
                return res.status(500).json(error)
        }
}