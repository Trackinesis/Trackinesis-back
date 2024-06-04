const Plan = require('../model/plan');

exports.createPlan = async (req, res) => {
    const { name, description, objective, startDate, endDate } = req.body;

    try {
        const plan = await Plan.create({ name, description, objective, startDate, endDate });
        return res.status(201).json({ message: 'Plan created successfully', plan });
    } catch (error) {
        console.error('Error creating plan:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
