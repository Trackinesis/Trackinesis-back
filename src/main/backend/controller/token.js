const jwt = require ("jsonwebtoken")
const User = require("../model/signup")

//llamado cada vez q hago front - back
exports.sessionVerifier = async (req, res) => {
    if (!req.headers.authorization){
        return {
            success: false,
        }
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        return {
            success: false,
        }
    }

    if (!decodedToken || !decodedToken.userId || !decodedToken.email) {
        return {
            success: false,
        };
    }

    let user = await User.findByPk(decodedToken.userId);
    if (!user) {
        return {
            success: false,
        };
    }
    return {
        success: true,
        data: {
            userId: user.userId,
            email: user.email,
        }
    }
}
