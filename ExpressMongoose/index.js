// all the packages that we require for the application

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

// this is the model of the product that we made in mongoose
const Product = require('./models/product')


// this starts our mongoose library, connecting the ODM to MongoDb
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/farmStand');
  console.log('MONGO CONNECTION OPEN')
}

// this is the middleware that we use, to allow us to use ejs, create put and delete requests, to use form data
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

//ROUTES

// THIS IS OUR ALL PRODUCTS ROUTE
app.get('/products', async (req, res) => {
    const products = await Product.find({});
    res.render('products/index', {products})
})

// THIS IS OUR NEW PRODUCT ROUTE, BOTH A GET AND POST REQ. MUST BE BEFORE THE SHOW ROUTE
app.get('/products/new', (req, res) => {
    res.render('products/new')
})

app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
})

//THIS IS OUR SHOW ROUTE, THAT SHOWS INFO FOR ONE ITEM
app.get('/products/:id', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/show', {product})
})

// THIS IS OUR EDIT ROUTE, BOTH A GET AND PUT ROUTE
app.get('/products/:id/edit', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', {product})
})

app.put('/products/:id', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
    res.redirect(`/products/${product._id}`)
})


// THIS IS OUR DELETE ROUTE
app.delete('/products/:id', async (req, res) => {
    const {id} = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products')
})

app.listen(3000, () => {
    console.log('APP IS LISTENING ON PORT 3000')
})