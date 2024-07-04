const express = require('express');
const app = express();
const path = require('path');
const db = require('./src/main/backend/utils/database');
const session = require('express-session')

//-----------------ROUTES------------------
const logins = require('./src/main/backend/routes/login');
const logouts = require('./src/main/backend/routes/logout');
const signups = require('./src/main/backend/routes/logout');
const users = require('./src/main/backend/routes/user');
const plans = require('./src/main/backend/routes/plan');
const planRoutines = require('./src/main/backend/routes/planRoutine');
const routines = require('./src/main/backend/routes/routine');
const routineExercise = require('./src/main/backend/routes/routineExercise');
const exercises = require('./src/main/backend/routes/exercise');
const goals = require('./src/main/backend/routes/goal');
const friends = require('./src/main/backend/routes/friend');
//const tokens = require('./src/main/backend/routes/token');
const cors = require('cors');

app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(session({
    secret: 'secret',
    cookie: {
        sameSite: 'strict',
    }
}));
app.use(express.urlencoded({extended: true}));

function generateRandomInt(min, max) {
    const range = max - min;
    const randomNumber = Math.random();
    const scaledFloat = randomNumber * range;
    const randomInt = Math.floor(scaledFloat);
    const finalRandomInt = randomInt + min;
    return finalRandomInt;
  }
  const randomInt = generateRandomInt(1, 1000000);

//-----------------USEAGES------------------
app.use('/', logins);
app.use('/logout', logouts);
app.use('/signup', signups);
app.use('/api/user', users);
app.use('./plan', plans);
app.use('./planRoutine', planRoutines);
app.use('./routine', routines);
app.use('./routineExercise', routineExercise);
app.use('/exercise', exercises);
app.use('/goal', goals);
app.use('/friend', friends);
//app.use('/token', tokens)

app.use('/static', express.static(path.join(__dirname, 'public')));

(async () => {
    await db.sync({force: false})
        .then(async() => {
            //await db.drop()
        console.log('Models synchronized successfully with the database.');
    })
        .catch(error => {
            console.error('Error synchronizing model:', error);
        });
})();


const Models = require('./src/main/backend/model/index');
const Signup = require('./src/main/backend/model/signup');
const User = require('./src/main/backend/model/user');
const Plan = require('./src/main/backend/model/plan');
const PlanRoutine = require('./src/main/backend/model/planRoutine');
const Routine = require('./src/main/backend/model/routine');
const RoutineExercise = require('./src/main/backend/model/routineExercise');
const Exercise = require('./src/main/backend/model/exercise');
const Goal = require('./src/main/backend/model/goal')
const Friend = require('./src/main/backend/model/friend')
const Token = require('./src/main/backend/model/token')

const {where} = require("sequelize");
const TokenUtil = require("./src/main/backend/utils/tokenUtil");



app.post('/login', async (req, res) => {
    let tokenUtil;
    try {
      const { email, password } = req.body;
      const user = await Signup.findOne({
        where: {
          email: email,
          password: password
        }
      });
  
      tokenUtil = new TokenUtil(36000, "key");
  
      if (user) {
        req.session.user = user;
        req.session.authorized = true;
  
        const tokenString = tokenUtil.generateToken({ id: user.userId });
  
        const newToken = await Token.create({
          token: tokenString,
          userId: user.userId
        });
  
        return res.json({ message: 'Success', token: tokenString }); // Send token object
      } else {
        return res.send('Fail');
      }
    } catch (error) {
      console.error('Error while searching in the database.', error);
      return res.send({ message: 'Error while searching in the database.' });
    }
});

app.post('/updatePassword/:userId', async (req, res) => {
    const userId = req.params.userId;
    const newPassword = req.body.password;

    try {
        const userToUpdate = await Signup.findByPk(userId);
        if (!userToUpdate) {
            return res.status(404).json({ error: 'user not found' });
        }

        await userToUpdate.update({password : newPassword});
        res.status(200).json({message: 'Update successful'});
    } catch (err) {
        console.log('error updating user');
        res.status(500).json({error: 'Internal server error'});
    }
});

app.get('/login', async (req, res) => {
    try {
        const users = await Signup.findAll();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching routines' });
    }
});

app.get('/token/:token', async (req, res) => {
    const token = req.params.token;
    try {
      const foundToken = await Token.findByPk(token);
  
      if (!foundToken) {
        return res.status(404).json({ message: 'Token not found' });
      }
  
      const userId = foundToken.userId;
  
      res.json({ userId });
    } catch (error) {
      console.error('Error fetching token data:', error);
      res.status(500).json({ message: 'Error fetching token data' });
    }
  });  

  app.get('/signupsteptwo/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const users = await User.findByPk(userId);
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users' });
    }
});

app.post('/signup', async (req, res) => {
    const userId = randomInt
    try {
        await Signup.create({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: req.body.password,
            userId: userId
        });
        return res.json({ id: userId });
    } catch (error) {
        console.error(error);
        return res.status(400).json(error);
    }
});

app.delete('/signup/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const deletedUser = await Signup.findByPk(userId);

        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        await deletedUser.destroy()

        res.status(200).json({ message: 'User deleted successfully', deletedUser });

    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/signupsteptwo', async (req, res) => {
    const userId = req.body.userId;
    try {
        await User.create({
            age: req.body.age,
            weight: req.body.weight,
            height: req.body.height,
            gender: req.body.gender,
            userId: userId
        });
        return res.json({ id: userId });
    } catch (error) {
        console.error(error);
        return res.status(400).json(error);
    }
});

app.post('/signupsteptwo/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId);
    const { maxBench, maxSquat, maxDeadlift, strenghtRatio } = req.body;

    try {
        const userToUpdate = await User.findByPk(userId);
        if (!userToUpdate) {
            return res.status(404).json({ error: 'user not found' });
        }

        const updatedStrengthRatio = userToUpdate.weight > 0
      ? ((maxBench || userToUpdate.maxBench) + (maxSquat || userToUpdate.maxSquat) + (maxDeadlift || userToUpdate.maxDeadlift)) / userToUpdate.weight
      : 0;
        
        const updatedUser = {
            ...userToUpdate,
            maxBench: maxBench || userToUpdate.maxBench,
            maxSquat: maxSquat || userToUpdate.maxSquat,
            maxDeadlift: maxDeadlift || userToUpdate.maxDeadlift,
            strenghtRatio: updatedStrengthRatio,
        };

        await userToUpdate.update(updatedUser);

        res.status(200).json({ message: 'User maxes updated successfully', updatedUser });
    } catch (error) {
        console.error('Error updating friend maxes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    });

  app.get('/signupsteptwo/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const users = await User.findByPk(userId);
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users' });
    }
});

app.get('/signupsteptwo', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users' });
    }
});

app.get('/home/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
      const foundUser = await Signup.findByPk(userId);
  
      if (!foundUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const name = foundUser.name;
  
      res.json({ name });
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ message: 'Error fetching user data' });
    }
});  

app.post('/plan', async (req, res) => {
    const userId = req.body.userId
    try {
        const plan = await Plan.create({
            name: req.body.name,
            type: req.body.type,
            description: req.body.description,
            objective: req.body.objective,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            userId: userId
        });
        return res.json( {id: plan.planId});
    } catch (error) {
        console.error(error);
        return res.status(400).json(error);
    }
});

app.get('/plan', async (req, res) => {
    try {
        const plans = await Plan.findAll();
        res.json(plans);
    } catch (error) {
        console.error('Error fetching plans:', error);
        res.status(500).json({ message: 'Error fetching plans' });
    }
});

app.delete('/plan/:planId', async (req, res) => {
    const planId = req.params.planId;   
    try {
        const deletedPlan = await Plan.findByPk(planId);

        if (!deletedPlan) {
            return res.status(404).json({ error: 'Plan not found' });
        }

        await deletedPlan.destroy()

        res.status(200).json({ message: 'Plan deleted successfully', deletedPlan });

    } catch (error) {
        console.error('Error deleting plan:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/planroutine', async (req, res) => {
    try {
        const planRoutine = await PlanRoutine.create({
            planId: req.body.planId,
            routineId: req.body.routineId
        });
        return res.json({ planRoutine });
    } catch (error) {
        console.error(error);
        return res.status(400).json(error);
    }
});


app.post('/createroutine', async (req, res) => {
    try {
        const routine = await Routine.create({
            name: req.body.name,
            day: req.body.day,
            type: req.body.type,
            description: req.body.description
        });
        return res.json( {id: routine.routineId} );
    } catch (error) {
        console.error(error);
        return res.status(400).json("Error creating routine");
    }
});

app.get('/routine', async (req, res) => {
    try {
        const routines = await Routine.findAll();
        res.json(routines);
    } catch (error) {
        console.error('Error fetching routines:', error);
        res.status(500).json({ message: 'Error fetching routines' });
    }
});

app.delete('/routine/:routineId', async (req, res) => {
    const routineId = req.params.routineId;

    try {
        const deletedRoutine = await Routine.findByPk(routineId);

        if (!deletedRoutine) {
            return res.status(404).json({ error: 'Routine not found' });
        }

        await deletedRoutine.destroy()

        res.status(200).json({ message: 'Routine deleted successfully', deletedRoutine });

    } catch (error) {
        console.error('Error deleting routine:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/routineExercise', async (req, res) => {
    try {
        const routineExercise = await RoutineExercise.create({
            routineId: req.body.routineId,
            exerciseId: req.body.exerciseId,
            name: req.body.name,
            sets: req.body.sets,
            reps: req.body.reps,
            weight: req.body.weight,
            duration: req.body.duration
        });
        return res.json({ routineExercise });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error });
    }
});

app.post('/exercise', async (req, res) => {
    try {
        await Exercise.create({
            name: req.body.name,
            type: req.body.type,
            description: req.body.description
        });
        return res.json("Exercise created successfully");
    } catch (error) {
        console.error(error);
        return res.status(400).json("Error creating exercise");
    }
});

app.get('/exercise', async (req, res) => {
    try {
        const exercises = await Exercise.findAll();
        res.json(exercises);
    } catch (error) {
        console.error('Error fetching exercises:', error);
        res.status(500).json({ message: 'Error fetching exercises' });
    }
});

app.post('/goal', async (req, res) => {
    try {
        await Goal.create({
            name: req.body.name,
            description: req.body.description,
            status: req.body.status
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json("Error creating")
    }

});

app.get('/goal', async (req, res) => {
    try {
        const goals = await Goal.findAll();
        res.json(goals);
    } catch (error) {
        console.error('Error fetching goals:', error);
        res.status(500).json({ message: 'Error fetching goals' });
    }
});

app.delete('/goal/:goalId', async (req, res) => {
    const goalId = req.params.goalId;

    try {
        const deletedGoal = await Goal.findByPk(goalId);

        if (!deletedGoal) {
            return res.status(404).json({ error: 'Goal not found' });
        }

        await deletedGoal.destroy()

        res.status(200).json({ message: 'Goal deleted successfully', deletedGoal });

    } catch (error) {
        console.error('Error deleting goal:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/goal/:goalId', async (req, res) => {
    const goalId = parseInt(req.params.goalId);
    
    try {
        const updatedGoal = await Goal.findByPk(goalId)
        if (!updatedGoal) {
            res.status(404).json({ error: 'Goal not found'} );
        }
    
        const newStatus = updatedGoal.status === true ? false : true;
        await updatedGoal.update({ status: newStatus })

        res.status(200).json({ message: 'Goal updated successfully', updatedGoal });

    } catch (error) {
        console.error('Error updating goal:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    
  });

  app.post('/friend', async (req, res) => {
    try {
        await Friend.create({
            name: req.body.name,
            maxBench: req.body.maxBench,
            maxSquat: req.body.maxSquat,
            maxDeadlift: req.body.maxDeadlift
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json("Error creating")
    }

});

app.get('/friend', async (req, res) => {
    try {
        const friends = await Friend.findAll();
        res.json(friends);
    } catch (error) {
        console.error('Error fetching friends:', error);
        res.status(500).json({ message: 'Error fetching friends' });
    }
});

app.delete('/friend/:friendId', async (req, res) => {
    const friendId = req.params.friendId;

    try {
        const deleteFriend = await Friend.findByPk(friendId);

        if (!deleteFriend) {
            return res.status(404).json({ error: 'Friend not found' });
        }

        await deleteFriend.destroy()

        res.status(200).json({ message: 'Friend deleted successfully', deleteFriend });

    } catch (error) {
        console.error('Error deleting friend:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
  

app.get('/home', (req, res) => {
    res.send('Welcome to the home page');
});

app.listen(8081, () => {
    console.log('Server is running on port 8081');
});