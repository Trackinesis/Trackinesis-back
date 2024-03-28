/*const { Sequelize } = require('sequelize');
const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "trackinesis"
})

app.post('/signup', (req, res) => {
    console.log(req.body)
    const sql = "INSERT INTO `login` (`first_name`, `last_name`, `email`, `password`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err, data) => {
        if(err) {
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.post('/signupsteptwo', (req, res) => {
    console.log(req.body)
    const sql = "INSERT INTO `user` (`age`, `weight`, `height`, `gender`) VALUES (?)";
    const values = [
        req.body.age,
        req.body.weight,
        req.body.height,
        req.body.gender
    ]
    db.query(sql, [values], (err, data) => {
        if(err) {
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.post('/login', (req, res) => {
    console.log(req.body)
    const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
    db.query(sql, [req.body.email, req.body.password ], (err, data) => {
        if(err) {
            return res.json("Error");
        }
        if(data.lenght > 0) {
            return res.json("Success")
        }
        else {
            return res.json("Fail")
        }
    })
})

app.listen(8081, ()=> {
    console.log("listening");
})*/