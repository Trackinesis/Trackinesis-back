const Login = require('../model/signup');
module.exports = {
    create: async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.send('Por favor, ingrese su correo electrónico y contraseña.');
        }

        try {
            let user = await Login.findOne({
                where: { email, password }
            });

            if (user) {
                req.session.user = user;
                req.session.authorized = true;
                return req.json('Success');
            }
            else {
                return res.send('Credenciales incorrectas. No se encontró ningún usuario con ese correo electrónico y contraseña.');
            }
        }
        catch (error) {
            console.error('Error al buscar en la base de datos:', error);
            return res.send('Error al buscar en la base de datos.');
        }
    }
};