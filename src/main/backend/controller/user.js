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
            res.status(400).json({ error: 'Faltan campos requeridos' });
        }
    },

    login: async (req, res) => {
        res.status(404).json({ error: 'No se ha implementado la función de inicio de sesión para los usuarios' });
    }
};
