const express = require('express');
const app = express();
const path = require('path');
const db = require('./src/main/backend/util/database');
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
const goal = require('./src/main/backend/routes/goal')
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
app.use('/goal', goal)

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

//-----------------MODELS------------------
const Models = require('./src/main/backend/model/index')
const Signup = require('./src/main/backend/model/signup');
const User = require('./src/main/backend/model/user');
const Plan = require('./src/main/backend/model/plan');
const PlanRoutine = require('./src/main/backend/model/planRoutine')
const Routine = require('./src/main/backend/model/routine');
const RoutineExercise = require('./src/main/backend/model/routineExercise');
const Exercise = require('./src/main/backend/model/exercise');
const Goal = require('./src/main/backend/model/goal')

app.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await Signup.findOne({
            where: {
                email: email,
                password: password
            }
        });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const sessionId = crypto.randomUUID();
        await user.createSession({sessionId});

        res.json({ sessionId });

        if (user) {
            req.session.user = user;
            req.session.authorized = true;
            return res.redirect('/home');
        } else {
            return res.send('Fail');
        }
    } catch (error) {
        console.error('Error while searching in the database.', error);
        return res.send('Error while searching in the database.');
    }
});

app.post('/signup', async (req, res) => {
    try {
        const user = await User.create()
        await Signup.create({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: req.body.password,
            userId: user.id
        });
        return res.json({ id: user.id });
    } catch (error) {
        console.error(error);
        return res.status(400).json(error);
    }
});

app.post('/signupsteptwo', async (req, res) => {
    try {
        const userId = req.body.userId;
        console.log(userId)

        if (!userId) {
            return res.status(400).json("No valid user ID provided.");
        }

        const [numRowsUpdatedUser] = await User.update({
                age: req.body.age,
                weight: req.body.weight,
                height: req.body.height,
                gender: req.body.gender
            },
            { where: { id: userId } }
        );

        if (numRowsUpdatedUser === 1) {
            return res.json("Profile created successfully");
        }
        else {
            return res.status(400).json("User not found for update.");
        }
    } catch (error) {
        console.error(error);
        return res.status(400).json("Error creating profile");
    }
});

app.get('/home', async (req, res) => {
    try {
        const name = await Signup.findAll();
        res.json(name);
    } catch (error) {
        console.error('Error fetching name:', error);
        res.status(500).json({ message: 'Error fetching name' });
    }
});

app.post('/plan', async (req, res) => {
    try {
        await Plan.create({
            name: req.body.name,
            type: req.body.type,
            description: req.body.description,
            objective: req.body.objective,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        });
        return res.json("Plan created successfully");
    } catch (error) {
        console.error(error);
        return res.status(400).json("Error creating plan");
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

app.post('/createroutine', async (req, res) => {
    try {
        await Routine.create({
            name: req.body.name,
            day: req.body.day,
            type: req.body.type,
            description: req.body.description
        });
        return res.json("Routine created successfully");
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

app.post('/addexercise', async (req, res) => {
    const routineExerciseId = req.body.routineExerciseId;

    if (!routineExerciseId) {
        return res.status(400).json("No valid exercise ID provided.");
    }

    try {
        const [numRowsUpdatedExercise] = await RoutineExercise.create({
                name: req.body.name,
                sets: req.body.sets,
                reps: req.body.reps,
                weight: req.body.weight,
                duration: req.body.duration,
            },
            { where: { id: routineExerciseId } }
        );
        return res.json("Exercise created successfully");
    } catch (error) {
        console.error(error);
        return res.status(400).json("Error creating exercise");
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

app.post('/routineExercise', async (req, res) => {
    try {
        await RoutineExercise.create({
            name: req.body.name,
            sets: req.body.sets,
            reps: req.body.reps,
            weight: req.body.weight,
            duration: req.body.duration
        });
        return res.json("Exercise created successfully");
    } catch (error) {
        console.error(error);
        return res.status(400).json("Error creating exercise");
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

app.get('/home', (req, res) => {
    res.send('Welcome to the home page');
});

app.listen(8081, () => {
    console.log('Server is running on port 8081');
});

