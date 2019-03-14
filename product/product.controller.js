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

