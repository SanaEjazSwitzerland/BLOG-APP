const jwt = require('jsonwebtoken');
const secret = 'sdughwougbwlgbdg';

const verifyToken = (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).send('Invalid Token');
        }
        req.user = decoded;
        next();
    });
};

module.exports = verifyToken;
