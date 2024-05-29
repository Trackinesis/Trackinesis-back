const Signup = require('./signup');
const User = require('./user');
const Goal = require('./goal')
const Plan = require('./plan');
const PlanRoutine = require('./planRoutine');
const Routine = require('./routine');
const RoutineExercise = require('./routineExercise');
const Exercise = require('./exercise');

//Foo.hasOne(Bar, {
//   foreignKey: {
//     allowNull: false,
//   },
// });


Signup.hasOne(Goal, { foreignKey: 'userId' }) //TODO hasMany
Goal.belongsTo(Signup, { foreignKey: 'userId'})

Signup.hasMany(Plan, { foreignKey: 'userId' });
Plan.belongsTo(Signup, { foreignKey: 'userId' }); //TODO [17;21] verif si esta bien

User.belongsTo(Signup, { foreignKey: 'userId', allowNull: false });


Signup.hasMany(Plan, { foreignKey: 'userId', allowNull: false });
Plan.belongsTo(Signup, { foreignKey: 'userId', allowNull: false });

Plan.hasMany(PlanRoutine, { foreignKey: 'planId', allowNull: false });
PlanRoutine.belongsTo(Plan, { foreignKey: 'planId', allowNull: false });

Routine.hasMany(PlanRoutine, { foreignKey: 'routineId', allowNull: false });
PlanRoutine.belongsTo(Routine, { foreignKey: 'routineId', allowNull: false });

RoutineExercise.belongsTo(Routine, { foreignKey: 'routineId', allowNull: false });

Exercise.hasMany(RoutineExercise, { foreignKey: 'exerciseId', allowNull: false });
RoutineExercise.belongsTo(Exercise, { foreignKey: 'exerciseId', allowNull: false });

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