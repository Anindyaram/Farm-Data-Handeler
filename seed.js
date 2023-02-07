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

// const p = new Product({
//     name:'Grapes',
//     price:20,
//     category:'fruit'
// })
// p.save()
//     .then(p=>{
//         console.log(p);
//     })
//     .catch(err=>{
//         console.log(err);
//     })

const seedProducts = [
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'vegetable'
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        price: 3.99,
        category: 'fruit'
    },
    {
        name: 'Organic Celery',
        price: 1.50,
        category: 'vegetable'
    },
    {
        name: 'Chocolate Whole Milk',
        price: 2.69,
        category: 'dairy'
    },
]
//validation will be checked every time
Product.insertMany(seedProducts)
    .then(p=>{
        console.log(p);
    })
    .catch(err=>{
        console.log(err);
    })



