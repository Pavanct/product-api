const Product = require('./product.model');

exports.create = (req, res) => {
    //request validation
    if(!req.body){
        return res.status(400).send({
            message: "Product content could not be empty"
        });
    }
}

//Create of a Product 
const product = new Product({
    title: req.body.title || "No product title",
    description: req.body.description,
    price: req.body.price,
    company: req.body.company
});

//Save products 
product.save()
.then(data => {
    res.send(data);
}).catch(err => {
    res.status(500).send({
        message: err.message || "Something wrong while creating the product"
    })
})

//Retrieve all products from the database
exports.findAll = (req, res) => {
    Product.find()
    .then(products => {
        Product.find().then(products=>{
            console.log(products);
        }).catch(err=>{
            res.status(500).send({
                message: err.message || "Something wrong while retrieving the products"
            });
        });
    });
}