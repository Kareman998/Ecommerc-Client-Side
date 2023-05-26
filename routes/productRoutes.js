const products = require("../Controllers/Product");
const router = require("express").Router();
// const Product = require('../models/Product');
// const User = require('../models/User');


//get all product
router.get("/", products.getallproduct);
//create product
router.post('/', products.createproduct)
// update product
router.patch('/:id', products.updateproduct)
// delete product
router.delete("/:id",products.deleteproduct);
// category
router.get('/:id',products.findcategory)
//get category
router.get('/category/:category', products.getcategory)
//add to cart
router.post("/add-to-cart", products.addToCart);
//increase product
router.post("/increase-cart", products.increaseproduct);
//decrease product
router.post("/decrease-cart", products.decreaseproduct);
//remove from cart
router.post("/remove-from-cart", products.removeproduct);
module.exports = router;




