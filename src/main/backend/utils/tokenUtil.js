const jwt = require('jsonwebtoken');

class TokenUtil {
    constructor() {
        this.expirationTime = '1h'
        this.key = ''
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
            expiresIn: this.expirationTime
        }
        return jwt.sign(values, this.key, options)
    }

    tokenValidate(token) {
        try {
            const decodedToken = jwt.verify(token, this.key)
            return true
        } catch (err) {
            if (err instanceof jwt.TokenExpiredError || err.message.includes('invalid signature')) {
                return false;
            }
            throw err;
        }
    }

    getUserIdByToken(token) {
        const decodedToken = jwt.verify(token, this.key)
        return decodedToken.subject
    }

}

//To use this do:
// const jwtUtil = new JwtUtil();
// jwtUtil.setSecret('yourSecret');
// jwtUtil.setJwtExpirationInMs(3600000); // Set expiration time in milliseconds
// console.log(jwtUtil.generateToken('userId123'));
// console.log(jwtUtil.validateToken('tokenString'));
// console.log(jwtUtil.getUserIdFromToken('tokenString'));