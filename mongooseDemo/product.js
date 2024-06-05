const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ProductApp');
    console.log('CONNECTION OPEN')
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        maxLength: 20
    },
    price: {
        type: Number,
        require: true,
        min: 0
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: [String]
})

const Product = mongoose.model('Product', productSchema);

const bike = new Product({name: 'Bike Helmet', price: 29.99, categories: ['safety', 'cycling']})
await bike.save();