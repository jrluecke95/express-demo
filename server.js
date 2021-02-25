// set up empty repo via git and terminal
// set up gitignore file as in this folder
// npm init -y to set up auto stuff
// git add and commit and then push to main branch 

const http = require('http');
const express = require('express');
// npm install express
const db = require('./db');

const hostname = '127.0.0.1';
const port = 3000;

const app = express();

const server = http.createServer(app);

app.get('/', (req, res) => {
    res.send('poop dicks')
})

app.get('/about', (req, res) => {
    res.send('about poop dicks')
})

app.get('/cats', (req, res) => {
    res.send('Meow')
})

app.get('/dogs', (req, res) => {
    res.send('dogs')
})

app.get('/cats_and_dogs', (req, res) => {
    res.send('cats and dogs')
})

app.get('/hello/:name', (req, res) => {
    const {name} = req.params;
    res.send(`Hello ${name}`)
})

app.get('/greet/:name', (req, res) => {
    const {name} = req.params;
    res.send(`<h1>Hello, ${name}</h1>`)
})

app.get('/friends', (req, res) => {
    let html = '';
    db.forEach(friend => {
        html += `<li>${friend.name}</li>`
    })

    res.send(html)
})

app.get('/friends/:handle', (req, res) => {
    const foundFriend = db.find((friend) => {
        if (friend.handle === req.params.handle) {
            return true 
        } else {
            return false
        }
    })

    if (foundFriend) {
        let html = `<h1>${foundFriend.name}</h1>`;
        html += `<h2>${foundFriend.skill}</h2>`
        res.send(html);
    } else {
        res.status(404);
        res.send('could not find user with taht handle');
    }
    
})

app.get('*', (req, res) => {
    res.status(404)
    res.send('silly goose this is not a page');
})

server.listen(port, hostname, () => {
    console.log(`Server runing at http://${hostname}:${port}`)
})