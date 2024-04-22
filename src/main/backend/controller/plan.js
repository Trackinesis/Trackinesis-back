const Plan = require('../model/plan');

exports.createPlan = async (req, res) => {
    const { startDate, endDate, description, objective } = req.body;
    const { userId } = req.session.user;

    try {
        const plan = await Plan.create({ startDate, endDate, description, objective, userId });
        return res.status(201).json({ message: 'Plan created successfully', plan });
    } catch (error) {
        console.error('Error creating plan:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
