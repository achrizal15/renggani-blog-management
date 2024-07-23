class NotFoundError extends Error {
        constructor(message) {
                super(message)
                this.name = "NotFoundError";
        }
}

class FileNotFoundError extends Error {
        constructor(message) {
                super(message)
                this.name = "FileNotFoundError";
        }
}
class InvalidFileTypeError extends Error {
        constructor(message) {
                super(message)
                this.name = "InvalidFileTypeError";
        }
}
export { NotFoundError,InvalidFileTypeError,FileNotFoundError }