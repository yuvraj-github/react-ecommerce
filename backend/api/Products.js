const express = require('express');
const router = express.Router();
const commonFunction = require('../common/Common');
const Product = require('../db/Product');
const cors = require('cors');
router.use(express.json());
router.use(cors());

router.get('/products', commonFunction.verifyToken, async (req, resp) => {
    let products = await Product.find().sort({ _id: -1 });
    if (products.length > 0) {
        resp.status(200).send(products);
    } else {
        resp.status(401).send({ result: 'No products found.' });
    }

});

router.post('/addProduct', commonFunction.verifyToken, async (req, resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
});

router.delete('/deleteProduct/:id', commonFunction.verifyToken, async (req, resp) => {
    const result = await Product.deleteOne({ _id: req.params.id });
    resp.send(result);
});

router.get('/getProduct/:id', commonFunction.verifyToken, async (req, resp) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        resp.status(200).send(result);
    } else {
        resp.status(401).send({ result: 'No record found.' });
    }
});

router.put('/updateProduct/:id', commonFunction.verifyToken, async (req, resp) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    );
    resp.send(result);
});

router.get('/search/:key', commonFunction.verifyToken, async (req, resp) => {
    let result = await Product.find({
        '$or': [
            { name: { $regex: req.params.key } },
            { price: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
            { company: { $regex: req.params.key } }
        ]
    });
    resp.send(result);
});

module.exports = router;