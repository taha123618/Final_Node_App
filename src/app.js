const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT;
const hbs = require('hbs');
const dotenv = require('dotenv');
require('./DB/connection');
const User = require('./models/userSchema');

// For Sercurity of password of databse 
dotenv.config({ path: './config.env' });

// coneect the static path 
const staticpath = path.join(__dirname, '../public');
const templatesPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
// for bootstrap & jquery 
app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")))
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")))
app.use('/jq', express.static(path.join(__dirname, "../node_modules/jquery/dist")))

// for convert in json (conatct ka end wala kam)
app.use(express.urlencoded({ extended: false }));

// middleware
app.use(express.static(staticpath));

// view engine set 
app.set("view engine", "hbs");
app.set("views", templatesPath);
hbs.registerPartials(partialsPath);

// routing 
app.get('/', (req, res) => {
    res.render('index');
})

// for conatct (last wala kam)
app.post('/contact', async (req, res) => {
    try {
        // res.send(req.body);
        const userData = new User(req.body);
        await userData.Save();
        res.status(201).render('index');

    } catch (error) {
        res.status(500).send(error);
    }
});

// listen 
app.listen(port, () => {
    console.log(`server is running on ${port}`);
});