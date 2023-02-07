const express = require('express');
const app = express();
const path = require('path');
const mongoose  = require('mongoose');
mongoose.set('strictQuery' , true);
mongoose.connect('mongodb://127.0.0.1:27017/shopApp',{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        console.log("Mongo Connected yee")
    })
    .catch((err)=>{
        console.log("Theirs an error ",err);
    })

app.set('views', path.join(__dirname ,'views'));
app.set('view engine' ,'ejs');

app.get('/' ,(req ,res)=>{
    res.send('Hello by crud')
})

app.listen(3000 , ()=>{
    console.log('Conneted to port 3000');
})
