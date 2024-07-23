import fs from 'fs'
const deleteFileService = (filepath) => {
        if (filepath) {
                fs.unlink(filepath, (err) => {
                        if (err) {
                                console.log(err)
                        }
                })
        }
}
export default deleteFileService