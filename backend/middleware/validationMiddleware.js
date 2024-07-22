import { validationResult } from "express-validator"

export default function validationMiddleware(req, res, next) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
                return res.status(400).json({
                        errors: errors.array().map(err => ({
                                field: err.path,
                                message: err.msg
                        }))
                })
        }
        next()
}