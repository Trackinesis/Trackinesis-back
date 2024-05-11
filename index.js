const express = require('express');
const app = express();
const path = require('path');
const db = require('./src/main/backend/util/database');
const session = require('express-session')

const logins = require('./src/main/backend/routes/login');
const logouts = require('./src/main/backend/routes/logout');
const signups = require('./src/main/backend/routes/logout');
const users = require('./src/main/backend/routes/user');
const plans = require('./src/main/backend/routes/plan');
const planRoutines = require('./src/main/backend/routes/planRoutine');
const routines = require('./src/main/backend/routes/routine');
const routineExercises = require('./src/main/backend/routes/routineExercise');
const exercises = require('./src/main/backend/routes/exercise');
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

app.use('/', logins);
app.use('/logout', logouts);
app.use('/signup', signups);
app.use('/api/user', users);
app.use('./plan', plans);
app.use('./planRoutine', planRoutines);
app.use('./routine', routines);
app.use('./routineExercise', routineExercises);
app.use('/exercise', exercises);

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

const Signup = require('./src/main/backend/model/signup');
const User = require('./src/main/backend/model/user');
const Plan = require('./src/main/backend/model/plan');
const PlanRoutine = require('./src/main/backend/model/planRoutine')
const Routine = require('./src/main/backend/model/routine');
const RoutineExercise = require('./src/main/backend/model/routineExercise');
const Exercise = require('./src/main/backend/model/exercise');

app.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await Signup.findOne({
            where: {
                email: email,
                password: password
            }
        });
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


app.post('/routine', async (req, res) => {
    try {
        await Routine.create({
            name: req.body.name,
            type: req.body.type,
            description: req.body.description
        });
        return res.json("Routine created successfully");
    } catch (error) {
        console.error(error);
        return res.status(400).json("Error creating routine");
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

app.get('/home', (req, res) => {
    res.send('Welcome to the home page');
});

app.listen(8081, () => {
    console.log('Server is running on port 8081');
});

