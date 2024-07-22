class NotFoundError extends Error {
        constructor(message) {
                super(message)
                this.name = "NotFoundError";
        }
}
class InvalidFileTypeError extends Error {
        constructor(message) {
                super(message)
                this.name = "InvalidFileTypeError";
        }
}
export { NotFoundError,InvalidFileTypeError }