const Signup = require('./signup');
const User = require('./user');
const Goal = require('./goal')
const Plan = require('./plan');
const PlanRoutine = require('./planRoutine');
const Routine = require('./routine');
const RoutineExercise = require('./routineExercise');
const Exercise = require('./exercise');
const Friend = require('./friend');

//Foo.hasOne(Bar, {
//   foreignKey: {
//     allowNull: false,
//   },
// });


Signup.hasMany(Goal, { foreignKey: 'userId', onDelete: 'Cascade' }) //TODO hasMany
Goal.belongsTo(Signup, { foreignKey: 'userId'})

Signup.hasMany(Friend, { foreignKey: 'userId', onDelete: 'Cascade' });
Friend.belongsTo(Signup, { foreignKey: 'userId' });

Signup.hasOne(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.belongsTo(Signup, { foreignKey: 'userId', allowNull: false, onDelete: 'Cascade' });

Signup.hasMany(Plan, { foreignKey: 'userId', allowNull: false, onDelete: 'Cascade' });
Plan.belongsTo(Signup, { foreignKey: 'userId', allowNull: false });

Plan.hasMany(PlanRoutine, { foreignKey: 'planId', allowNull: false , onDelete: 'Cascade' });
PlanRoutine.belongsTo(Plan, { foreignKey: 'planId', allowNull: false });

Routine.hasMany(PlanRoutine, { foreignKey: 'routineId', allowNull: false, onDelete: 'Cascade' });
PlanRoutine.belongsTo(Routine, { foreignKey: 'routineId', allowNull: false });

RoutineExercise.belongsTo(Routine, { foreignKey: 'routineId', allowNull: false });

Exercise.hasMany(RoutineExercise, { foreignKey: 'exerciseId', allowNull: false, onDelete: 'Cascade' });
RoutineExercise.belongsTo(Exercise, { foreignKey: 'exerciseId', allowNull: false });

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