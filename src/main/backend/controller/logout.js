const Signup = require('../model/signup');

exports.logoutController = async (req, res) => {
    const { user } = req.session;
    if (!user) {
        return res.status(404).json({ error: 'User not found in session' });
    }

    try {
        const signup = await Signup.findByPk(user.userId);
        if (!signup) {
            return res.status(404).json({ error: 'Signup record not found' });
        }

        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            return res.redirect('/login');
        });
    } catch (error) {
        console.error('Error finding signup record:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
