const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

const isAuth = require('../middleware/is-auth');

const { body } = require('express-validator');


router.get('/add-product', isAuth, adminController.getAddProduct);

router.get('/products', isAuth, adminController.getProducts);

router.post('/add-product', [
    body('title').isString().isLength({ min: 3 }).trim(),
    body('price').isNumeric(),
    body('description').isLength({ min: 5, max: 400 })
], isAuth, adminController.postAddProduct)

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product', [
    body('title').isString().isLength({ min: 3 }).trim(),
    body('price').isNumeric(),
    body('description').isLength({ min: 5, max: 400 })
], isAuth, adminController.postEditProduct);

router.post('/delete-product', isAuth, adminController.postDeteleProd);

module.exports = router;