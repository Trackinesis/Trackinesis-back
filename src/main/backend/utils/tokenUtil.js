const jwt = require('jsonwebtoken');

class TokenUtil {

    constructor(expirationTime, key) {
        this.expirationTime = expirationTime
        this.key = key
    }

    setExpirationTime(time) {
        this.expirationTime = time
    }

    setKey(keyword) {
        this.key = keyword
    }

    generateToken(userId) {
        const values = {
            subject : userId
        }
        const options = {
            expiresIn: this.expirationTime,
            algorithm: 'HS512'
        }
        return jwt.sign(values, this.key, options)
    }

    tokenValidate(token) {
        try {
            const decoded = jwt.verify(token, this.key, { algorithms: ['HS512'] })
            return decoded
        } catch (err) {
            if (err instanceof jwt.TokenExpiredError || err.message.includes('invalid signature')) {
                return false
            }
            throw err
        }
    }

    getUserIdByToken(token) {
        try {
            const decoded = jwt.verify(token, this.key, { algorithms: ['HS512'] })
            return decoded.subject
        } catch (error) {
            return null;
        }
    }

}

module.exports = TokenUtil;

//To use this do:
// const jwtUtil = new JwtUtil();
// jwtUtil.setSecret('yourSecret');
// jwtUtil.setJwtExpirationInMs(3600000); // Set expiration time in milliseconds
// console.log(jwtUtil.generateToken('userId123'));
// console.log(jwtUtil.validateToken('tokenString'));
// console.log(jwtUtil.getUserIdFromToken('tokenString'));