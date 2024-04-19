const User = require('../models/user');

module.exports = {
    getUsername: async (req, res) => {
        try {
            const { username } = req.session.user;

            const user = await User(username);

            if (user) {
                return res.json({ username: user.username });
            } else {
                return res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            console.error('Error getting username:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    login: async (req, res) => {
        res.status(404).json({ error: 'The user login function has not been implemented.' });
    }
};
