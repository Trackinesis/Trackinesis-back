const sequelize = require('sequelize');
const Signup = require('./signup');
const User = require('./user');
const Goal = require('./goal')
const Plan = require('./plan');
const Routine = require('./routine');
const RoutineExercise = require('./routineExercise');
const Exercise = require('./exercise');
const Friend = require('./friend');
const UserHistory = require('./userHistory');
const PlanRoutine = require('./planRoutine');

//Foo.hasOne(Bar, {
//   foreignKey: {
//     allowNull: false,
//   },
// });

Signup.hasMany(Goal, {
    foreignKey: {
      name: 'userId',
      allowNull: false,
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Signup.hasMany(Friend, {
    foreignKey: {
      name: 'userId',
      allowNull: false,
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

Signup.hasOne(User, {
    foreignKey: {
        name: 'userId',
        allowNull: false,
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Signup.hasMany(Plan, {
    foreignKey: {
      name: 'userId',
      allowNull: false,
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Signup.hasMany(Routine, {
    foreignKey: {
        name: 'userId',
        allowNull: false,
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Plan.hasMany(PlanRoutine, {
    foreignKey: {
      name: 'planId',
      allowNull: false,
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Routine.hasMany(PlanRoutine, {
    foreignKey: {
      name: 'routineId',
      allowNull: false,
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});


Routine.hasMany(RoutineExercise, {
    foreignKey: {
      name: 'routineId',
      allowNull: false,
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Exercise.hasMany(RoutineExercise, {
    foreignKey: {
      name: 'exerciseId',
      allowNull: false,
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

/*Routine.belongsToMany(Plan, {
        through: PlanRoutine
    }
);

Plan.belongsToMany(Routine, {
    through: PlanRoutine
}
);

Routine.belongsToMany(Exercise, {
    through: RoutineExercise
}
);

Exercise.belongsToMany(Routine, {
    through: RoutineExercise
}
);*/

Signup.hasMany(UserHistory, { foreignKey: 'userId' });
UserHistory.belongsTo(Signup, { foreignKey: 'userId' });


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