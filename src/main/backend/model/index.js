const sequelize = require('sequelize');
const Signup = require('./signup');
const User = require('./user');
const Goal = require('./goal')
const Plan = require('./plan');
const PlanRoutine = require('./planRoutine');
const Routine = require('./routine');
const RoutineExercise = require('./routineExercise');
const Exercise = require('./exercise');
const Friend = require('./friend');

Signup.hasMany(Goal, { foreignKey: 'userId', onDelete: 'Cascade' }) //TODO hasMany
Goal.belongsTo(Signup, { foreignKey: 'userId'})

Signup.hasMany(Friend, { foreignKey: 'userId', onDelete: 'Cascade' });
Friend.belongsTo(Signup, { foreignKey: 'userId' });

Signup.hasOne(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.belongsTo(Signup, { foreignKey: 'userId'});

Signup.hasMany(Plan, { foreignKey: 'userId'});
Plan.belongsTo(Signup, { foreignKey: 'userId'});

Plan.hasMany(Routine, { foreignKey: 'planId'});
Routine.belongsTo(Plan, { foreignKey: 'planId'});

Routine.hasMany(Exercise, {foreignKey: 'exerciseId'});
Exercise.belongsTo(Routine, { foreignKey: 'exerciseId'});


module.exports = {
    Signup,
    User,
    Goal,
    Friend,
    Plan,
    PlanRoutine,
    Routine,
    RoutineExercise,
    Exercise
}