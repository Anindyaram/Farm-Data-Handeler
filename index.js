const express = require('express');
const app = express();
const path = require('path');
const mongoose  = require('mongoose');
const Product = require('./models/product')

mongoose.set('strictQuery' , true);
mongoose.connect('mongodb://127.0.0.1:27017/farmStand',{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        console.log("Mongo Connected yee")
    })
    .catch((err)=>{ 
        console.log("Theirs an error ",err);
    })

app.set('views', path.join(__dirname ,'views'));
app.set('view engine' ,'ejs');

app.get('/products' ,async (req ,res)=>{
    const product = await Product.find({})
    console.log('All Product')
    res.render('products/index' , { product })
})

app.get('/products/:id' ,async (req ,res)=>{
    const { id } = req.params;
    const product = await Product.findById(id);
    console.log('Product details');
    res.render('products/show',{ product });
})

app.listen(3000 , ()=>{
    console.log('Conneted to port 3000');
})
