const jwt = require('jsonwebtoken');

function authMiddleWare(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('ACCESS DENIED. No token provided!');

    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        req.user = decoded
        next();
    } catch (e) {
        res.status(400).send('Invalid Token!');
    }
}

module.exports = authMiddleWare;