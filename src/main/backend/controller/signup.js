const Signup  = require('../model/signup');
const {USER} = require("../config/dbConfig");
const User = require('../model/user')

module.exports = {

    create: async (req, res) => {
        if (req.body.name && req.body.email && req.body.password) {
            const {name, email, password} = req.body;
            const user = await User.create( )

            console.log(user)

            await Signup.create({
                name,
                email,
                password,
                userId: user.id
            });

            res.cookie('name', name, { secure: true });
        }
        else {
            res.send('Not added to the database!');
        }
    },

    signup: async (req, res) => {
        if(req.body.name && req.body.email && req.body.password) {
            const {name, email, password} = req.body;

            let user = await Signup.findOne({
                where: {name, email, password}
            });

            if (user) {
                req.session.user = user;
                req.session.authorized = true;
            }
            else {
                res.render('signup');
            }
        }
    }
}