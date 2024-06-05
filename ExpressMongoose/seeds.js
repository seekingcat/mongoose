const mongoose = require('mongoose');
const Product = require('./models/product');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/farmStand');
  console.log('MONGO CONNECTION OPEN')
}

// const p = new Product({
//     name: 'Ruby Grapefruit',
//     price: 1.99,
//     category: 'fruit'
// })

const seedProducts = [
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'vegetable'
    },
    {
        name: 'Plum tomatoes',
        price: 0.55,
        category: 'vegetable'
    },
    {
        name: 'Caribbean bananas',
        price: 1.65,
        category: 'fruit'
    },
    {
        name: 'Seedless Watermelon',
        price: 3.89,
        category: 'fruit'
    },
    {
        name: 'Farm Fresh Eggs',
        price: 1.25,
        category: 'dairy'
    },
    {
        name: 'Fresh from cow Milk',
        price: 3.75,
        category: 'dairy'
    }
]

await Product.insertMany(seedProducts)