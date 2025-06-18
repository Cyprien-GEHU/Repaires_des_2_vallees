const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        console.log(req.headers.authorization)
        const split = req.headers.authorization.split(" ")
        const token = split[1]
        
        if (!token) {
            return res.status(401).json('No token has found');
        }

        const decodeToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET')
        req.userId = decodeToken.userId;
        req.userRole = decodeToken.rule;
        next();
    } catch(err) {
        return res.status(500).json(`${err}`);
    }
}