const Signup = require('./signup');
const User = require('./user');
const Goal = require('./goal')
const Plan = require('./plan');
const PlanRoutine = require('./planRoutine');
const Routine = require('./routine');
const RoutineExercise = require('./routineExercise');
const Exercise = require('./exercise');

User.belongsTo(Signup, { foreignKey: 'userId' });

Signup.hasOne(Goal, { foreignKey: 'userId' })
Goal.belongsTo(Signup, { foreignKey: 'userId'})

Signup.hasMany(Plan, { foreignKey: 'userId' });
Plan.belongsTo(Signup, { foreignKey: 'userId' });

Plan.hasMany(PlanRoutine, { foreignKey: 'planId' });
PlanRoutine.belongsTo(Plan, { foreignKey: 'planId' });

Routine.hasMany(PlanRoutine, { foreignKey: 'routineId' });
PlanRoutine.belongsTo(Routine, { foreignKey: 'routineId' });

RoutineExercise.belongsTo(Routine, { foreignKey: 'routineId' });

Exercise.hasMany(RoutineExercise, { foreignKey: 'exerciseId' });
RoutineExercise.belongsTo(Exercise, { foreignKey: 'exerciseId' });

module.exports = {
    Signup,
    User,
    Goal,
    Plan,
    PlanRoutine,
    Routine,
    RoutineExercise,
    Exercise
}