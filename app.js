const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const users = require('./routes/users');

const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

app.use("/users", users);

//Home route
app.get('/', (req, res) => {
    res.render('home');
});

module.exports = app;