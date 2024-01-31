const express=require('express')
const path= require('path')
const bcrypt = require("bcrypt")
var bodyParser= require('body-parser')

const app= express()


var urlEncodded= bodyParser.urlencoded({extended:false})

app.use(express.static('public'))

const {MongoClient}= require('mongodb')
var url = "mongodb+srv://awadyara2000:UTh6s4uvoFVv0fKp@cluster0.lzxhfph.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(url);
const db= client.db('YarTrainig')
const coll= db.collection('users')

app.set('view engine', 'ejs')

app.get("/", function(req,res)
{
    res.render('login')
});

app.post("/reg", (req,res)=>
{
    res.render('login')
})

app.post("/update", urlEncodded, async(req,res)=>{
     
    const result = await coll.updateOne({email:req.body.email, password:req.body.password, name:req.body.name, age:req.body.age, gender:req.body.gender})

})

var server = app.listen(9001, function()
{
    var host= server.address().address
    var port= server.address().port
})


console.log("start server ")