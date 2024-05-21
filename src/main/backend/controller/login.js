const jwt = require('jsonwebtoken');
const Signup = require('../model/signup');

const expirationTime = '1h';

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Please enter your email address and password.' });
    }

    let user = await Signup.findOne({
        where: { email, password }
    });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    try {
        const token = jwt.sign({
                id: user.id,
                email: user.email
            },
            process.env.USER, {
                expiresIn: expirationTime
            });
        res.status(200).json({ message: 'User logged in successfully', token: token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}