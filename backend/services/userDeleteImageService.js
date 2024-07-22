import fs from 'fs'
import path from 'path'
const userDeleteImageService = (filepath) => {
        if (filepath) {
                fs.unlink(filepath, (err) => {
                        if (err) {
                                console.log(err)
                        }
                })
        }
}
export default userDeleteImageService