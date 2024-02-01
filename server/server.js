const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const { MongoClient } = require('mongodb');
var url = "mongodb+srv://awadyara2000:UTh6s4uvoFVv0fKp@cluster0.lzxhfph.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
const db = client.db('YarTrainig');
const coll = db.collection('final');

const urlEncoded = bodyParser.urlencoded({ extended: false });

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render('login');
});

app.get("/register", (req, res) => {
    res.render('reg');
});

app.get("/login", (req, res) => {
    res.render('login');
});

app.post("/login", urlEncoded, async (req, res) => {
    console.log(req.body.password, req.body.email);
    const result = await coll.findOne({ email: req.body.email, password: req.body.password });
    if (result) {
        res.redirect('/home');
    } else {
        res.render('reg');
    }
});

app.post("/reg", urlEncoded, async (req, res) => {
    console.log(req.body.password, req.body.email);
    const existingUser = await coll.findOne({ email: req.body.email });

    if (existingUser) {
        res.render('login');
    } else {
        await coll.insertOne({ name: req.body.name, email: req.body.email, password: req.body.password });
        res.redirect('/home');
    }
});

app.get("/home", (req, res) => {
    res.render('home');
});

const port=5000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});