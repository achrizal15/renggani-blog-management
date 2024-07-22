import { validationResult } from "express-validator"
const validationResponse = (req, callback = (err) => { }) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
                callback(errors);
                return {
                        status: 400,
                        errors: errors.array().map(err => ({
                                field: err.path,
                                message: err.msg
                        }))
                }
        }
        return {
                status: null,
                errors: null
        }
}
export default validationResponse