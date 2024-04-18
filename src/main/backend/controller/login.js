const User = require('../model/user');

module.exports = {
    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ where: { email, password } });

            if (user) {
                req.session.user = { username: user.username };
                return res.json({ message: 'Login successful' });
            } else {
                return res.status(401).json({ error: 'Incorrect email or password' });
            }
        } catch (error) {
            console.error('Error logging in:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
};