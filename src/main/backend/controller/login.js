const jwt = require('jsonwebtoken');
const Signup = require('../model/signup');

const expirationTime = '24h';

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Please enter your email address and password.' });
    }

    let user = await Signup.findOne({
        where: { email, password }
    });
    if (!findUser) {
        return res.status(404).json({ message: 'User not found' });
    }
    let token;
    try {
        token = jwt.sign(
            {
                userId: user.userId,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {expiresIn: expirationTime }
        );
    } catch (error) {
        console.error(error);
        res.success = false;
        res.message = 'jwt token error'
        return res.send(res);
    }
    console.log("created used " + name);

    return res.status(200).json({
        success: true,
        data: {
            userId: user.userId,
            email: user.email,
            token: token
        },
    });

}