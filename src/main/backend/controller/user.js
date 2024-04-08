const User = require('../model/user');

module.exports = {
    create: async (req, res) => {
        if (req.body.age && req.body.weight && req.body.height && req.body.gender) {
            const { age, weight, height, gender } = req.body;

            await User.create({
                age,
                weight,
                height,
                gender
            });

            res.json({ message: 'User created successfully' });
        }
        else {
            res.status(400).json({ error: 'Required fields are missing.' });
        }
    },

    login: async (req, res) => {
        res.status(404).json({ error: 'The user login function has not been implemented.' });
    }
};
