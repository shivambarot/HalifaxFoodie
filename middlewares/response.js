module.exports = (req, res, next)  => {
    res.sendResponse = (Data) => {
        //logic
        res.send(Data);
    };
    res.sendError = (options) => {
        const { statusCode, message } = options;
        const response = { success: false, message };
        res.status(statusCode).send(response);
    };
    next();
};
