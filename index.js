require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const db = require('./src/main/backend/utils/database');
const session = require('express-session');
const nodemailer = require('nodemailer');


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

const userHistoryRoutes = require('./src/main/backend/routes/userHistory');

//const tokens = require('./src/main/backend/routes/token');

const cors = require('cors');

app.use(cors({
    origin: ['http://localhost:3000', 'https://trackinesis.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());
app.use(session({
    secret: 'secret',
    cookie: {
        sameSite: 'strict',
    }
}));
app.use(express.urlencoded({ extended: true }));


  //const randomInt = Math.floor(Math.random()*100000);

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
app.use('/userHistory', userHistoryRoutes);

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
const UserHistory = require("./src/main/backend/model/userHistory");
//const { name } = require('ejs');



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
    const userId = Math.floor(Math.random()*100000);
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
    const userId = parseInt(req.params.userId); // Cambié a req.params.userId
    const { maxBench, maxSquat, maxDeadLift } = req.body; // Removí strenghtRatio ya que se calcula

    try {
        const userToUpdate = await User.findOne({ where: { userId: userId } }); // Cambio de findByPk a findOne
        if (!userToUpdate) {
            return res.status(404).json({ error: 'user not found' });
        }

        const strengthRatio = userToUpdate.weight > 0
            ? ((maxBench || userToUpdate.maxBench) + (maxSquat || userToUpdate.maxSquat) + (maxDeadLift || userToUpdate.maxDeadLift)) / userToUpdate.weight
            : 0;
        
        const updatedUser = {
            maxBench: maxBench || userToUpdate.maxBench,
            maxSquat: maxSquat || userToUpdate.maxSquat,
            maxDeadLift: maxDeadLift || userToUpdate.maxDeadLift,
            strengthRatio: strengthRatio,
        };

        await userToUpdate.update(updatedUser);
        await UserHistory.create({userId, maxBench, maxSquat, maxDeadLift, strengthRatio})

        res.status(200).json({ message: 'User maxes updated successfully', updatedUser });
    } catch (error) {
        console.error('Error updating user maxes:', error);
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
    const userId = req.body.userId;
    try {
        // Crear el plan
        const plan = await Plan.create({
            name: req.body.name,
            type: req.body.type,
            description: req.body.description,
            objective: req.body.objective,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            userId: userId
        });

        // Obtener seguidores (usuarios que siguen al creador del plan)
        const followers = await Friend.findAll({
            where: { followedId: userId }
        });

        if (followers.length === 0) {
            console.log('No followers to notify');
            return res.json({ id: plan.planId });
        }

        // Configuración del transporter de nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        // Obtener información del usuario que creó el plan
        const user = await Signup.findOne({
            where: { userId: userId }
        });

        if (!user || !user.name) {
            console.error('User name not found');
            return res.status(404).json({ message: 'User not found' });
        }

        // Notificar a cada seguidor
        for (let follower of followers) {
            const followerUser = await Signup.findOne({
                where: { userId: follower.userId }
            });

            if (followerUser && followerUser.email) {
                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: followerUser.email,
                    subject: `💪 New Plan Created by ${user.name}! 🏋️`,
                    html: `
                        <div style="font-family: 'Roboto', sans-serif; text-align: center; color: #11203D; padding: 20px; background-color: #f5f7fa; border-radius: 10px;">
                            <h1 style="color: #11203D; font-size: 28px; margin-bottom: 20px;">Your Friend Just Created a New Plan!</h1>
                            <p style="font-size: 18px; line-height: 1.5;">
                                Hi <strong>${followerUser.name}</strong>,<br><br>
                                Great news! Your friend <strong>${user.name}</strong> just created a new plan in <strong>Trackinesis</strong>. 💪
                            </p>
                            <p style="font-size: 16px; line-height: 1.5; margin: 20px 0;">
                                Check it out and stay motivated to reach your fitness goals together. Keep pushing each other to greatness!
                            </p>
                            <footer style="font-size: 12px; color: #555;">
                                Let's crush those goals! 💪<br>
                                <strong>Trackinesis</strong>
                            </footer>
                        </div>
                    `
                };

                await transporter.sendMail(mailOptions);
                console.log(`Email sent to: ${followerUser.email}`);
            }
        }

        return res.json({ id: plan.planId });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
});

app.get('/plan/:userId', async (req, res) => {
    const userId = req.params.userId

    if (!userId) {
        return res.status(400).json({ message: 'UserId is required' });
    }

    try {
        const plans = await Plan.findAll({
            where: {
                userId: userId
            }
        });
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

app.get('/planroutine/:planId', async (req, res) => {
    const planId = req.params.planId;

    if (!planId) {
        return res.status(400).json({ message: 'PlanId is required' });
    }

    try {
        const routines = await PlanRoutine.findAll({
            where: {
                planId: planId
            }
        });

        if (routines.length === 0) {
            return res.status(404).json({ message: `No routines found for planId ${planId}` });
        }

        res.json(routines);
    } catch (error) {
        console.error('Error fetching routines:', error);
        res.status(500).json({ message: 'Error fetching routines', error });
    }
});


app.post('/createroutine', async (req, res) => {
    const userId = req.body.userId;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const routine = await Routine.create({
            name: req.body.name,
            day: req.body.day,
            type: req.body.type,
            description: req.body.description,
            state: req.body.state,
            userId: userId
        });

        if (routine.state === 'private') {
            console.log('Routine is private, no emails will be sent.');
            return res.json({ id: routine.routineId });
        }

        const followers = await Friend.findAll({
            where: { followedId: userId }
        });

        if (followers.length === 0) {
            console.log('No friends to notify');
            return res.json({ id: routine.routineId });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const user = await Signup.findOne({
            where: { userId: userId }
        });

        if (!user || !user.email) {
            console.error('User email not found');
            return res.status(404).json({ message: 'User email not found' });
        }

        for (let follower of followers) {
            const friendUser = await Signup.findOne({
                where: { userId: follower.userId }
            });

            if (friendUser && friendUser.email) {
                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: friendUser.email,
                    subject: `💪 New Routine Created by ${user.name}! 🏋️`,
                    html: `
                            <div style="font-family: 'Roboto', sans-serif; text-align: center; color: #11203D; padding: 20px; background-color: #f5f7fa; border-radius: 10px;">
                                <h1 style="color: #11203D; font-size: 28px; margin-bottom: 20px;">Your Friend Just Created a New Routine!</h1>
                                <p style="font-size: 18px; line-height: 1.5;">
                                    Hi <strong>${friendUser.name}</strong>,<br><br>
                                    Great news! Your friend <strong>${user.name}</strong> just created a new routine in <strong>Trackinesis</strong>. 💪
                                </p>
                                <p style="font-size: 16px; line-height: 1.5; margin: 20px 0;">
                                    Check it out and stay motivated to reach your fitness goals together. Keep pushing each other to greatness!
                                </p>
                                <footer style="font-size: 12px; color: #555;">
                                    Let's crush those goals! 💪<br>
                                    <strong>Trackinesis</strong>
                                </footer>
                            </div>
                        `

                };

                await transporter.sendMail(mailOptions);
                console.log(`Email sent to: ${friendUser.email}`);
            }
        }

        return res.json({ id: routine.routineId });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: 'Error creating routine or sending emails', error });
    }
});

app.get('/routine/get/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        let routines;

        if (userId) {
            routines = await Routine.findAll({
                where: { userId: userId }
            });
        } else {
            routines = await Routine.findAll();
        }

        res.json(routines);
    } catch (error) {
        console.error('Error fetching routines:', error);
        res.status(500).json({ message: 'Error fetching routines' });
    }
});

app.get('/routine/:day', async (req, res) => {
    const day = req.params.day;

    try {
        const routine = await Routine.findOne({
            where: { day }
        });

        if (routine) {
            res.json({ routineId: routine.routineId });
        } else {
            res.json({ routineId: null });
        }
    } catch (error) {
        console.error('Error fetching routine:', error);
        res.status(500).json({ error: 'Error fetching routine' });
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

app.post('/routineexercise/:routineExerciseId', async (req, res) => {
    const routineExerciseId = req.params.routineExerciseId;
    const updatedExerciseData = req.body;

    try {
        const exercise = await RoutineExercise.findByPk(routineExerciseId);

        if (!exercise) {
            return res.status(404).json({ error: 'Exercise not found' });
        }

        exercise.name = updatedExerciseData.name;
        exercise.sets = updatedExerciseData.sets;
        exercise.reps = updatedExerciseData.reps;
        exercise.weight = updatedExerciseData.weight;
        exercise.duration = updatedExerciseData.duration;

        await exercise.save();

        res.status(200).json({ message: 'Exercise updated successfully', exercise });
    } catch (error) {
        console.error('Error updating exercise:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/routineexercise/:routineId', async (req, res) => {
    const routineId = req.params.routineId;
    try {
        const exercises = await RoutineExercise.findAll({
            where: { routineId },
            attributes: ['routineExerciseId', 'name', 'sets', 'reps', 'weight', 'duration']
        });
        res.json(exercises);
    } catch (error) {
        console.error('Error fetching routine exercises:', error);
        res.status(500).json({ error: 'Error fetching routine exercises' });
    }
});

app.delete('/routineexercise/:routineExerciseId', async (req, res) => {
    const routineExerciseId = req.params.routineExerciseId;

    try {
        const exercise = await RoutineExercise.findByPk(routineExerciseId);

        if (!exercise) {
            return res.status(404).json({ error: 'Exercise not found' });
        }

        await exercise.destroy();

        res.status(200).json({ message: 'Exercise deleted successfully' });
    } catch (error) {
        console.error('Error deleting exercise:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ------------EXERCISE
const multer = require('multer');

// Configuración de almacenamiento en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// Endpoint para crear un ejercicio
app.post('/exercise', upload.single('file'), async (req, res) => {
    try {
        const { name, type, description } = req.body;
        const image = req.file ? req.file.buffer : null; // Obtiene la imagen del cuerpo de la solicitud

        const newExercise = await Exercise.create({
            name,
            type,
            description,
            image, // Guarda la imagen en la base de datos como un BLOB
        });

        return res.json({ message: 'Exercise created successfully', exercise: newExercise });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: 'Error creating exercise' });
    }
});

// Endpoint para obtener todos los ejercicios
app.get('/exercise', async (req, res) => {
    try {
        const exercises = await Exercise.findAll();

        // Convierte la imagen en BLOB a Base64
        const exercisesWithImages = exercises.map(exercise => {
            const imageBase64 = exercise.image ? exercise.image.toString('base64') : null;
            return {
                ...exercise.toJSON(),
                image: imageBase64, // Agrega la imagen en Base64
            };
        });

        res.json(exercisesWithImages);
    } catch (error) {
        console.error('Error fetching exercises:', error);
        res.status(500).json({ message: 'Error fetching exercises' });
    }
});

app.get('/exercise/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const exercise = await Exercise.findByPk(id);

        if (!exercise) {
            return res.status(404).json({ message: 'Exercise not found' });
        }

        // Convierte la imagen en BLOB a Base64 si existe
        const imageBase64 = exercise.image ? exercise.image.toString('base64') : null;

        res.json({ image: imageBase64 });
    } catch (error) {
        console.error('Error fetching exercise image:', error);
        res.status(500).json({ message: 'Error fetching exercise image' });
    }
});



// ---------- FINISH EXERCISE

app.post('/goal', async (req, res) => {
    const userId = req.body.userId;

    try {
        await Goal.create({
            name: req.body.name,
            description: req.body.description,
            status: req.body.status,
            userId: userId
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

app.post('/friend/:userId', async (req, res) => {
    const { userId } = req.params;
    const { friendId, followedName } = req.body;

    if (!userId || !friendId || !followedName) {
        return res.status(400).json({
            message: "Missing required fields. Ensure userId, friendId, and followedName are provided."
        });
    }

    try {
        const newFriend = await Friend.create({
            followedId: friendId,
            followedName: followedName,
            userId: userId
        });

        const followedUser = await Signup.findOne({
            where: { userId: friendId }
        });

        if (!followedUser || !followedUser.email) {
            console.error("Followed user not found or email is missing.");
            return res.status(404).json({
                message: "Followed user's email not found"
            });
        }

        const followerUser = await Signup.findOne({
            where: { userId: userId }
        });

        if (!followerUser || !followerUser.name) {
            console.error("Follower user not found or name is missing.");
            return res.status(404).json({
                message: "Follower user's name not found"
            });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: followedUser.email,
            subject: '💪 New Gym Partner Alert! 🏋️',
            html: `
                <div style="font-family: 'Roboto', sans-serif; text-align: center; color: #11203D; padding: 20px; background-color: #f5f7fa; border-radius: 10px;">
                    <h1 style="color: #11203D; font-size: 28px; margin-bottom: 20px;">You Have a New Follower!</h1>
                    <p style="font-size: 18px; line-height: 1.5;">
                        Hi <strong>${followedUser.name}</strong>,<br><br>
                        Great news! <strong>${followerUser.name}</strong> just started following you on <strong>Trackinesis</strong>. 💪
                    </p>
                    <p style="font-size: 16px; line-height: 1.5; margin: 20px 0;">
                        Stay motivated and inspire each other to reach your fitness goals. Together, you're stronger!
                    </p>
                    <footer style="font-size: 12px; color: #555;">
                        Keep pushing your limits! 💪<br>
                        <strong>Trackinesis</strong>
                    </footer>
                </div>
                 `
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully to:", followedUser.email);

        return res.status(201).json({
            message: "Friend added and notification sent successfully",
            newFriend
        });
    } catch (error) {
        console.error("Error creating friend or sending email:", error);

        return res.status(500).json({
            message: "An error occurred while adding friend and sending email",
            error: error.message
        });
    }
});


app.get('/friend/:userId', async (req, res) => {
    const userId = req.params.userId
    try {
        const friends = await Friend.findAll({
            where: { userId: userId},
            attributes: ['userFriendId', 'followedId', 'followedName'] // Specify attributes to retrieve
        });
        res.json(friends);
    } catch (error) {
        console.error('Error fetching friends:', error);
        res.status(500).json({ message: 'Error fetching friends' });
    }
});

app.delete('/friend/:friendId', async (req, res) => {
    const friendId = req.params.friendId;
    try {
        const deleteFriend = await Friend.findOne({
            where: {
                userFriendId: friendId
            }
        });
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

//----------------
app.get('/routine/find/:routineId', async (req, res) => {
    const routineId = parseInt(req.params.routineId);
    if (isNaN(routineId)) {
        return res.status(400).json({ error: 'Invalid routine ID' });
    }
    try {
        const routine = await Routine.findByPk(routineId);
        if (!routine) {
            return res.status(404).json({ message: 'Routine not found' });
        }
        res.status(200).json(routine);
    } catch (error) {
        console.error('Error fetching routine:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/routine/findByName/:routineName', async (req, res) => {
    const routineName = req.params.routineName;
    try {
        const routines = await Routine.findAll({
            where: { name: routineName },
        });
        if (routines.length === 0) {
            return res.status(404).json({ message: 'No routines found with this name' });
        }
        res.status(200).json(routines);
    } catch (error) {
        console.error('Error fetching routines by name:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/routine/findByCreator/:creatorId', async (req, res) => {
    const creatorId = parseInt(req.params.creatorId);
    if (isNaN(creatorId)) {
        return res.status(400).json({ error: 'Invalid creator ID' });
    }
    try {
        const routines = await Routine.findAll({
            where: { userId: creatorId },
        });
        if (routines.length === 0) {
            return res.status(404).json({ message: 'No routines found for this creator' });
        }
        res.status(200).json(routines);
    } catch (error) {
        console.error('Error fetching routines by creator:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




app.get('friends/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const friends = await Friend.findOne({
            where: {
                friendId: friendId,
                userId: userId
            }
        });
        res.json(friends);

    } catch (error) {
        console.error('Error fetching friends:', error);
        res.status(500).json({ error });
    }
});

app.post ('/createroutine', async (req, res) => {

    const routineId  = req.body.routineId;
    const userId = req.body.userId;

    try {
        const originalRoutine = await Routine.findByPk(routineId);

        if (!originalRoutine) {
            return res.status(404).send('Routine not found');
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        const newRoutine = await Routine.create({
            name: originalRoutine.name,
            description: originalRoutine.description,
            startDate: originalRoutine.startDate,
            endDate: originalRoutine.endDate,
            userId: userId
        });

        res.status(200).send('Routine copied successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.put('/user/:userId', async (req, res) => {
    const userId = req.params.userId;
    const { maxBench, maxSquat, maxDeadLift, strengthRatio} = req.body;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(200).json({ error: 'User not found'});

        }
        await user.update({ maxBench, maxSquat, maxDeadLift, strengthRatio});
        await UserHistory.create({userId, maxBench, maxSquat, maxDeadLift, strengthRatio});

    } catch (e) {
        console.log('Error updating user:', e);
        res.status(500).json({error: 'Internal server error'});
    }
});

app.get('/userHistory/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const history = await UserHistory.findAll({
            where: { userId: userId }
        });
        res.json(history);
    } catch (error) {
        console.error('Error fetching user history:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/userHistory/graph/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const userHistory = await UserHistory.findAll({
            where: { userId },
            order: [['date', 'ASC']]
        });

        res.json({ userHistory });

    } catch (error) {
        console.error('Error fetching user history', error);
        res.status(500).send('Internal server error');
    }
});


app.listen(8081, () => {
    console.log('Server is running on port 8081');
});