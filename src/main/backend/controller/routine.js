const Routine = require('../model/routine');

exports.createRoutine = async (req, res) => {
    const { name, type, description } = req.body;
    try {
        const existingRoutine = await Routine.findOne({ where: { name } });
        if (existingRoutine) {
            return res.status(400).json({ message: 'Routine already exists' });
        }
        await Routine.create({ name, type, description });
        return res.status(201).json({ message: 'Routine created successfully' });
    } catch (error) {
        console.error('Error creating routine:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};