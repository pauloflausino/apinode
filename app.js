// app.js
var jwt = require('jsonwebtoken');

var http = require('http'); 
const express = require('express');
const app = express();
var cookieParser = require('cookie-parser'); 
const bodyParser = require('body-parser');





const authenticate = (username, password) => {
    const userAuth = users.find(u => u.username === username && u.password === password);
    return userAuth;
}

const generateToken = (user) => {
    const token = jwt.sign({ id: user.id, username: user.username}, process.env.SECRET)
    return token;
};


app.get('/users/:id', (req, res) => {
    const user = {
        id: req.params.id,
        name: 'John Doe'
    };
    res.json(user);
});

app.get('/', (req, res, next) => {
    res.json({message: "Tudo ok por aqui! APP funcionando!"});
});

const users = [
    {id: 1, username: 'user1', password: 'password1'},
    {id: 2, username: 'user2', password: 'password2'},
    {id: 3, username: 'usuario', password: 'senha'},
];

app.post('/login', (req, res, next) => {
    
    if(!req.body.username || !req.body.password) {
        return res.status(400).json({ error: 'Bad Request'});
    }

    const user = authenticate(req.body.username, req.body.password);

    if(user) {
        const token = generateToken(user);
        return res.status(200).json({ access_token: token});
    }else {
        return res.status(403).json({ error: 'Forbidden'});
    }
    
});

app.post('/logout', function(req, res) {
    res.json({ auth: false, token: null });
})



module.exports = app;