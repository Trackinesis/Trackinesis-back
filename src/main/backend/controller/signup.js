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

    const signup = await Signup.create({
        name,
        surname,
        email,
        password,
        userId: user.id
    });
    //const userResponseDto = new UserResponseDto(signup, user)
    //aca se devuelve un response userDTO
    //hacer el token y enviar el token
    let token;
    try {
        const token = jwt.sign({id: user.id}, User, {
            expiresIn: expirationTime
        });
        res.status(201).json({message: 'User created successfully', token : token}) //atajo este json en el front
                                                                                //, user: userResponseDto
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Couldn't create user"});
    }
    res.status(201).json({message: 'User created successfully'});
}
