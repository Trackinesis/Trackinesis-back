const jwt = require('jsonwebtoken');
const Signup  = require('../model/signup');
const User = require('../model/user')

const expirationTime = '1h';

exports.createUser = async (req, res) => {
    const {name, email, password} = req.body;
    let existingUser = await Signup.findOne({
        where: {email}
    });
    if (existingUser) {
        return res.status(400).json({message: 'User already exists'});
    }
    const user = await User.create()

    await Signup.create({
        name,
        email,
        password,
        userId: user.id
    });
    //hacer el token y enviar el token
    try {
        const token = jwt.sign({id: user.id}, User, {
            expiresIn: expirationTime
        });
        res.status(201).json({message: 'User created successfully', token : token}) //atajo este json en el front

    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
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
//hacer lo mismo pero para login