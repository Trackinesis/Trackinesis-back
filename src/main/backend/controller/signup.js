const jwt = require('jsonwebtoken');
const Signup  = require('../model/signup');
const User = require('../model/user')

const expirationTime = '1h';

exports.createUser = async (req, res) => {
    const {name, surname, email, password} = req.body;
    let existingUser = await Signup.findOne({
        where: {email}
    });
    if (existingUser) {
        return res.status(400).json({message: 'User already exists'});
    }
    const user = await User.create()

    await Signup.create({
        name,
        surname,
        email,
        password,
        userId: user.id
    });
    //hacer el token y enviar el token
    let token;
    try {
        token = jwt.sign({
            userId: user.userId,
            email: user.email
        }, process.env.JWT_SECRET,
            {expiresIn: expirationTime}
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Couldn't create user"});
    }
    res.status(201).json({message: 'User created successfully'});
}
