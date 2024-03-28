const express = require('express');
const app = express();
const path = require('path');
const db = require('./src/main/backend/model');

const users = require('./src/main/backend/route/user');
const posts = require('./src/main/backend/route/post');
const login = require('./src/main/backend/route/login');
const {DATABASE} = require("./src/main/backend/config/db-config");

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use('/user', users);
app.use('/post', posts);
app.use('/login', login);


app.use('/static', express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

(async () => {
    await db.sequelize.sync();
})();

app.use((req, res, next) => {
    console.log(new Date().toLocaleDateString());
    next();
})

app.get('/', [
    (req, res, next) => {
        res.send('This is the home page!')
    }
]);

app.use(function (request, response, next) {
    console.log('This is global middleware');
    next();
});

app.listen(1234);