const Exercise = require('../model/exercise');

exports.createExercise = async (req, res) => {
    const { name, type, description } = req.body;
    try {
        const existingExercise = await Exercise.findOne({ where: { name } });
        if (existingExercise) {
            return res.status(400).json({ message: 'Exercise already exists' });
        }
        await Exercise.create({ name, type, description });
        return res.status(201).json({ message: 'Exercise created successfully' });
    } catch (error) {
        console.error('Error creating exercise:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};