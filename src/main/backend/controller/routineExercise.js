const RoutineExercise = require('../model/routineExercise');

exports.createRoutineExercise = async (req, res) => {
    const { name, sets, reps, weight, duration } = req.body;

    try {
        const routineExercise = await RoutineExercise.create({ name, sets, reps, weight, duration });
        return res.status(201).json({ message: 'RoutineExercise created successfully', routineExercise });
    } catch (error) {
        console.error('Error creating RoutineExercise:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};