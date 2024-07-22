const errorHandlerMiddleware = (err, req, res, next) => {
        if (err.name === 'NotFoundError') {
                return res.status(404).json({ error: err.message });
        }
        if (err.name === 'InvalidFileTypeError') {
                return res.status(400).json({ error: err.message });
        }
        return res.status(500).json({
                error: process.env.APP_DEBUG
                        ? err.message
                        : 'Internal Server Error'
        });
};

export default errorHandlerMiddleware;
