const PlanRoutine = require('../model/planRoutine');

exports.createPlanRoutine = async (req, res) => {
    const { planId, routineId } = req.body;

    try {
        const planRoutine = await PlanRoutine.create({ planId, routineId });
        return res.status(201).json({ message: 'PlanRoutine created successfully', planRoutine });
    } catch (error) {
        console.error('Error creating PlanRoutine:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
