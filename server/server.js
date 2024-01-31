var express=require('express')
var app= express()

var bodyParser= require('body-parser')

var urlEncodded= bodyParser.urlencoded({extended:false})

app.use(express.static('public'))

const {MongoClient}= require('mongodb')
var url = "mongodb+srv://awadyara2000:UTh6s4uvoFVv0fKp@cluster0.lzxhfph.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(url);
const db= client.db('YarTrainig')
const coll= db.collection('users')



app.get("/", function(req,res)
{
    res.sendFile(__dirname+'/public/login.html')
})

app.post("/login", urlEncodded, async(req,res)=>
{
    // console.log(req.body.password,req.body.email)
    const result = await coll.findOne({email:req.body.email, password:req.body.password})
    if(result.name)
    {
        res.send("user Founded")
        res.sendFile(__dirname+'./public/update.html')

}
else
{
    res.sendFile(__dirname+"/public/reg.html")
}
})

app.post("/reg", urlEncodded, async(req,res)=>
{
    const result1= await coll.findOne({email:req.body.email,name:req.body.name})
    if (result1)
    {
        res.send("Duplicate user data please change email or name")
    }
    else{
        const result = await coll.insertOne({email:req.body.email, password:req.body.password, name:req.body.name,age:req.body.age, gender:req.body.gender})
        res.send("Register Success")
    }
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