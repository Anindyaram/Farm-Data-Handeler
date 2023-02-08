const express = require('express');
const app = express();
const path = require('path');
const mongoose  = require('mongoose');
const Product = require('./models/product')
const methodOverride = require('method-override')

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
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

const categories = ['fruit', 'vegetable', 'dairy'];

app.get('/' , (req,res)=>{
    res.render('home')
})

app.get('/products' ,async (req ,res)=>{
    const product = await Product.find({})
    console.log('All Product')
    res.render('products/index' , { product })
})

//Making new product
app.get('/products/new',(req ,res)=>{
    res.render('products/new' , {categories})
})
//Saving product detail in the mongo
app.post('/products' ,async (req,res)=>{
    const newProduct = new Product(req.body);
    await newProduct.save();
    console.log(newProduct);
    res.redirect(`/products/${newProduct._id}`)
})

//Showing details of product by finding in the mongo
app.get('/products/:id' ,async (req ,res)=>{
    const { id } = req.params;
    const product = await Product.findById(id);
    console.log('Product details');
    res.render('products/show',{ product });
})
//updating particular product
app.get('/products/:id/edit',async (req ,res)=>{
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('products/edit' , {product ,categories})
})

app.put('/products/:id' , async (req, res)=>{
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id ,req.body ,{runValidators:true , new:true});
    res.redirect(`/products/${product._id}`)
})

//Deleting the product from the database
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

app.listen(3000 , ()=>{
    console.log('Conneted to port 3000');
})
