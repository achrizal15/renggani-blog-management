const errorHandlerMiddleware = (err, req, res, next) => {
        if (err.name === 'NotFoundError') {
                return res.status(404).json({ error: err.message });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
};

export default errorHandlerMiddleware;
