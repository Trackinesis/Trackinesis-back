const Goal = require('../model/goal');

exports.createGoal = async (req, res) => {
    try {
        const newGoal = await Goal.create(req.body);
        res.status(201).json(newGoal);
    } catch (error) {
        res.status(500).json({message: 'Error creating goal', error});
    }
};

exports.getAllGoals = async (req, res) => {
    try {
        const goals = await Goal.findAll();
        res.status(200).json(goals);
    } catch (error) {
        res.status(500).json({message: 'Error fetching goals', error});
    }
};

exports.getGoal = async (req, res) => {
    try {
        const goal = await Goal.findByPk(req.params.id);
        if (!goal) {
            return res.status(404).json({message: 'Goal not found'});
        }
        res.status(200).json(goal);
    } catch (error) {
        res.status(500).json({message: 'Error fetching goal', error});
    }
};

exports.updateGoal = async (req, res) => {
    try {
        const [updated] = await Goal.update(req.body, {
            where: { id: req.params.id }
        });
        if (!updated) {
            return res.status(404).json({message: 'Goal not found'});
        }
        res.status(404).json({message: 'Goal updated successfully'});
    } catch (error) {
        res.status(500).json({message: 'Error updating goal', error});
    }
};

exports.deleteGoal = async (req, res) => {
    try {
        const deleted = await Goal.destroy({
            where: { id: req.params.id }
        });
        if (!deleted) {
            return res.status(404).json({message: 'Goal not found'});
        }
        res.status(200).json({message: 'Goal deleted successfully'});
    } catch (error) {
        res.status(500).json({message: 'Error deleting goal', error});
    }
};