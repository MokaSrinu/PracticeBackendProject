const express = require('express');
const cors = require('cors');

const app = express();

const userRouterHandler = (req,res) => {
     console.log(new Date(),"GET/User");
     return res.send({name:"SrinuMoka"});
}

const postRouteHandler = (req,res) => {
    console.log(new Date(),"GET/post");
    return res.send({content:"Hello Srinu!!"});
}

app.get('/user',userRouterHandler);
app.get('/post',postRouteHandler);
app.get('/',(req,res)=>{
    console.log(new Date(),"Get/");
    res.send("Welcome to our express API");
});

app.listen(3001,()=>{
    console.log('Server Running at https://localhost:3001');
})