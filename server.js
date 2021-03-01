// set up empty repo via git and terminal
// set up gitignore file as in this folder
// npm init -y to set up auto stuff
// git add and commit and then push to main branch 

const http = require('http');
const express = require('express');
const es6Renderer = require('express-es6-template-engine');
// npm install express
const db = require('./db');

const hostname = '127.0.0.1';
const port = 3000;

const app = express();

app.engine('html', es6Renderer); // register html template engine
app.set('views', 'templates'); // look for templates in templates folder
app.set('view engine', 'html'); // use html engine for view rendering

const server = http.createServer(app);

app.get('/', (req, res) => {
    res.render('home', {
        locals: {
            title: 'Home page Here'
        },
        partials: {
            head: '/partials/head'
        }
    }); // looks in templates folder and finds home
})

app.get('/about', (req, res) => {
    res.render('about')
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
    res.render('friends', {
        locals: {
            title: 'friends page',
            friends: db
        },
        partials: {
            head: '/partials/head'
        }
    }); 
    
    //uses html template now

        // let html = '';
    // db.forEach(friend => {
    //     html += `<li>${friend.name}</li>`
    // })

    // res.send(html) //used to render html variable above
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
        // let html = `<h1>${foundFriend.name}</h1>`;
        // html += `<h2>${foundFriend.skill}</h2>`
        // res.send(html);
        res.render('friendSingle', {
            locals: {
                friend: foundFriend
            },
            partials: {
                head: '/partials/head'
            }
        });

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