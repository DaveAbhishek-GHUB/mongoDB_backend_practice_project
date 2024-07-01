const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const userModel = require('./models/user')

// Set EJS as view engine
app.set('view engine', 'ejs');

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route handler for the root path
app.get('/', (req, res) => {
    res.render('index');
//   res.send('Hello World!');
});

app.get('/read', async (req, res) => {
    let allusers = await userModel.find();
    res.render('read', {users: allusers});

});

app.post('/create', async(req, res) => {
    let {username, useremail, userimage} = req.body;
    let createduser = await userModel.create({
        name:username,
        email:useremail,
        imageurl:userimage
    });

    res.send(createduser);
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port 3000`);
});