module.exports = (app) => {
    const products = require('./product.controller.js');

    //Create a new product
    app.post('/products', products.create);

    //Retrieve all products
    app.get('/products', products.findAll);

    //Retrieve a single product by id
    app.get('/products/:productId', products.findOne);

    //Update a product by id
    app.put('/products/:productId', products.update);

    //Delete a product by id
    app.delete('/products/:productId', products.delete);
}