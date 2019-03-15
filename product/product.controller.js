const Product = require('./product.model.js');

exports.create = (req, res) => {
    //request validation
    console.log(req.body);
    if (!req.body) {
        return res.status(400).send({
            message: "Product content could not be empty"
        });
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
};

//Retrieve all products from the database
exports.findAll = (req, res) => {
    console.log("inside findAll");

    Product.find()
        .then(products => {
            if (products.length < 1) {
                res.send({
                    message: "No products found"
                });
            } else {
                res.send(products);
            }
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving products."
            });
        });
};

//Find a single product with product id
exports.findOne = (req, res) => {
    Product.findById(req.params.productId)
        .then(product => {
            if (!product) {
                return res.status(400).send({
                    message: "Product not found with id" + req.params.productId
                });
            }
            res.send(product);
        }).catch(err => {
            if (err.kind == 'ObjectId') {
                return res.status(404).send({
                    message: "Something wrong with retrieving product with id " + req.params.productId
                });
            }
            return res.status(500).send({
                message: "Something wrong retrieving product with id " + req.params.productId
            });
        });
};

//Update a product
exports.update = (req, res) => {
    //Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Product content can not be body"
        });
    }

    //Find a product by id and update
    Product.findByIdAndUpdate(req.params.productId, {
        title: req.body.title || "No product title",
        description: req.body.description,
        price: req.body.price,
        company: req.body.company
    }, {
        new: true
    }).then(product => {
        if (!product) {
            res.status(400).send({
                message: "Product not found with id " + req.params.productId
            })
        }
        res.send(product);
    }).catch(err => {
        if (err.kind == 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });
        }
        return res.status(500).send({
            message: "Product not found with id " + req.params.productId
        });
    });
};


// Delete a product with the specified productId in the request
exports.delete = (req, res) => {
    Product.findByIdAndDelete(req.params.productId)
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });
            }
            return res.status(200).send({
                message: "Product successfully deleted " + req.params.productId
            });
        });
};