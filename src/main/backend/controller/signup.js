const Signup  = require('../model/signup');

module.exports = {

    create: async (req, res) => {
        if (req.body.name && req.body.email && req.body.password) {
            const {name, email, password} = req.body;

            await Signup.create({
                name,
                email,
                password
            });

            res.cookie('name', name, { secure: true });
            res.render('profile', { name });
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
                res.render('profile', {name: name});
            }
            else {
                res.render('signup');
            }
        }
    }
}