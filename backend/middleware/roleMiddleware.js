const roleMiddleware = (req, res, next) => {
    const role = req.header('Role');
    req.role = role;
    next();
};

module.exports = roleMiddleware;
