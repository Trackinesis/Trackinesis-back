const express = require('express');
const app = express();
const path = require('path');
const db = require('./src/main/backend/model');
const session = require('express-session')

const users = require('./src/main/backend/route/user');
const login = require('./src/main/backend/route/login');
const logout = require('./src/main/backend/route/logout');
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

app.use('/api/user', users);
app.use('/', login);
app.use('/logout', logout);

app.use('/static', express.static(path.join(__dirname, 'public')));


(async () => {
    await db.sequelize.sync()
        .then(() => {
        console.log('Models synchronized successfully with the database.');
    })
        .catch(error => {
            console.error('Error synchronizing models:', error);
        });
})();

const Signup = require('./src/main/backend/model/signup');
const User = require('./src/main/backend/model/user');

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
        console.log(user)
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

        const [numRowsUpdated] = await User.update(
            {
                age: req.body.age,
                weight: req.body.weight,
                height: req.body.height,
                gender: req.body.gender
            },
            { where: { id: userId } }
        );

        if (numRowsUpdated === 1) {
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

app.get('/home', (req, res) => {
    res.send('Welcome to the home page');
});

app.listen(8081, () => {
    console.log('Server is running on port 8081');
});