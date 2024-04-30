const Login = require('../model/signup');
module.exports = {
    create: async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.send('Please enter your email address and password.');
        }

        try {
            let user = await Login.findOne({
                where: { email, password }
            });

            if (user) {
                req.session.user = user;
                req.session.authorized = true;
                return req.json('Success'); //token
            }
            else {
                return res.send('Incorrect credentials. No user was found with that email address and password.');
            }
        }
        catch (error) {
            console.error('Error while searching the database:', error);
            return res.send('Error while searching the database.');
        }
    }
};