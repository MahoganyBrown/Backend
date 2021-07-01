const express = require('express');
const cors = require('cors');
const app = express();
const MongoClient = require("mongodb");
const port = 4100
app.use(express.json());
app.use(cors());
const uri = "mongodb+srv://MaUser:brown@cluster0.5e4zk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
app.use(express.json());
app.listen(port, function(){
    console.log(`Listening at port ${port}`);


})
let db;
MongoClient.connect(uri, {useUnifiedTopology: true}, function(err,client){
    if (err) throw err;
    console.log("Connected to MongoDb successfully");
    db = client.db("blogs-db")
})

app.post('/postBlog', function(req,res){
    console.log("I was called");
    db.collection('blogs').insertOne(
        {
            "title": req.body.title,
            "content": req.body.content,
            "author": req.body.author
        }, function(err,result){
            if (err) throw err;
            res.send("Blog added successfully");
        }
    )
})

app.get('/getBlogs', function(req,res){
    db.collection('blogs').find({}).toArray(function(error,documents){
        if (error) throw error;
        res.send(documents)
        //for (let counter = 0; counter < documents.length;counter++){
            //res.write("Title: " + documents[counter].title + " Content: " + documents[counter].content + " Author: " + documents[counter].content + '\n');
        //}
        //res.end();
    })
})


app.post('/customBlog', function(req,res){
    db.collection('blogs').insertOne({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    }, function(err,result){
        if (err) throw err;
        res.send('Blog added successfully');
    })
});