const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function verifyToken(req, res, next) {
    const authHeader = req.get('Authorization');
    const token = authHeader.replace('Bearer ', '');
    const secretKey = process.env.JWT_KEY;

    if (!token) {
        return res.status(401)
    }

    try {
        const isTokenValid = jwt.verify(token, secretKey);
        if (!isTokenValid) {
            throw new Error();
        }
    } catch (err) {
        return res.status(401);
    }

    const tokenData = jwt.decode(token, secretKey);
    const userId = tokenData.userId;
    if (!userId) {
        return res.status(401);
    }

    const user = await User.findByPk(userId);
    if (!user) {
        return res.status(404);
    }

    req.userId = userId;
    next();
}

module.exports = verifyToken;