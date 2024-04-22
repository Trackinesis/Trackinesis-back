const express = require('express');
const app = express();
const path = require('path');
const db = require('./src/main/backend/util/database');
const session = require('express-session')

const login = require('./src/main/backend/routes/login');
const logout = require('./src/main/backend/routes/logout');
const signups = require('./src/main/backend/routes/logout');
const users = require('./src/main/backend/routes/user');
const plans = require('./src/main/backend/routes/plan');
const planRoutines = require('./src/main/backend/routes/planRoutine');
const routines = require('./src/main/backend/routes/routine');
const routineExercises = require('./src/main/backend/routes/routineExercise');
const exercise = require('./src/main/backend/routes/exercise');
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

app.use('/', login);
app.use('/logout', logout);
app.use('/signup', signups);
app.use('/api/user', users);
app.use('./plan', plans);
app.use('./planRoutine', planRoutines);
app.use('./routine', routines);
app.use('./routineExercise', routineExercises);
app.use('/exercise', exercise);

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
        console.log(userId);

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


app.post('/addRoutine', async (req, res) => {
    try {
        await Routine.create({
            name: req.body.name,
            type: req.body.type,
            code: req.body.code,
            objective: req.body.objective
        });
        return res.json("Routine created successfully");
    } catch (error) {
        console.error(error);
        return res.status(400).json("Error creating routine");
    }
});

app.post('/addexercise', async (req, res) => {
    try {
        const exerciseInfo = await RoutineExercise.create()
        await Exercise.create({
            name: req.body.name,
            type: req.body.type,
            description: req.body.description,
            exerciseId: exerciseInfo.id
        });
        return res.json("Exercise created successfully");
    } catch (error) {
        console.error(error);
        return res.status(400).json("Error creating exercise");
    }
});

app.post('/addexerciseinfo', async (req, res) => {
    try {
        const exerciseId = req.body.exerciseId;

        if (!exerciseId) {

            return res.status(400).json("No valid exercise ID provided.");
        }

        const [numRowsUpdatedExercise] = await RoutineExercise.update({
                sets: req.body.sets,
                reps: req.body.reps,
                time: req.body.timeExercise,
            },
            { where: { id: exerciseId } }
        );

        if (numRowsUpdatedExercise === 1) {
            return res.json("Exercise created successfully");
        }
        else {
            return res.status(400).json("User not found for update.");
        }
    } catch (error) {
        console.error(error);
        return res.status(400).json("Error creating profile");
    }
});

app.get('/home', (req, res) => {
    res.send('Welcome to the home page');
});

app.listen(8081, () => {
    console.log('Server is running on port 8081');
});