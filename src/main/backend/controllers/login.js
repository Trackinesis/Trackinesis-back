const jwt = require('jsonwebtoken');
const SignupTable = require('../models/signup');

const expirationTime = '1h';

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Please enter your email address and password.' });
    }


    let findUser = await SignupTable.findOne({
        where: { email, password }
    });
    if (!findUser) {
        return res.status(404).json({ message: 'User not found' });
    }
    try {
        const token = jwt.sign({ id: findUser.id },
            process.env.USER, {
                expiresIn: expirationTime
            });
        res.status(200).json({ message: 'User logged in successfully', token: token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}