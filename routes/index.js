var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var Cart = require('../models/cart');
var Order = require('../models/order');

/** Finds passwords and secrets in the .env file */
var dotenv = require('dotenv');
dotenv.load();

router.get('/item/:title', function(req,res){
  var title = req.params.title;
  Product.find({'title' : title }, function(err, Product){
	console.log(Product);
    res.render('item', { Product: Product });
	});
});

router.get('/', function(req, res, next) {
  res.render('home', { title: 'Jitz' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
});

router.get('/game', function(req, res, next) {
  res.render('game', { title: 'Secret Game' });
});

router.get('/feedback', function(req, res, next) {
  res.render('feedback', { title: 'Feedback' });
});

router.get('/locations', function(req, res, next) {
  res.render('locations', { title: 'Locations' });
});

router.get('/gallery', function(req, res, next) {
  res.render('gallery', { title: 'Locations' });
});

router.get('/order', function(req, res, next) {
  res.render('order', { title: 'Order' });
});

router.get('/add-to-cart/:id', function(req, res, next) {
    var productId = req.params.id;
    /** If cart exists passes it to session otherwise passes an empty object*/
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    /** Finds product */
    Product.findById(productId, function(err, product) {
       if (err) {
           return res.redirect('/');
       }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/');
    });
});

router.get('/shopping-cart', function(req, res, next) {
   if (!req.session.cart) {
       return res.render('shop/shopping-cart', {products: null});
   }
    var cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart', {products: cart.generateArray(), cart:cart });
});

router.get('/reduce/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});

router.get('/increase/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.increaseByOne(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});

router.get('/remove/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});

router.get('/checkout', isLoggedIn, function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];
    res.render('shop/checkout', {total: cart.grandTotalPrice, errMsg: errMsg, noError: !errMsg});
});

router.post('/checkout', isLoggedIn, function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    var stripe = require("stripe")(process.env.SECRET_TEST_KEY);
    stripe.charges.create({
        amount: cart.totalPrice * 100,
        currency: "usd",
        source: req.body.stripeToken,
        description: "Test Charge"
    }, function(err, charge) {
        if (err) {
            req.flash('error', err.message);
            return res.redirect('/checkout');
        }
        var order = new Order({
            user: req.user,
            cart: cart,
            address: req.body.address,
            name: req.body.name,
            paymentId: charge.id
        });
        order.save(function(err, result) {
            req.flash('success', 'Successfully bought product!');
            req.session.cart = null;
            res.redirect('/');
        });
    });
});

router.get('/menu', function(req, res, next) {
  Product.find({'size' : 'small'},function(err, Product){
  console.log(Product.length);
  res.render('shop/index', { title: 'Menu', Product: Product });
});
});

router.get('/all', function(req, res, next) {
  Product.find({'size' : 'small'},function(err, Product){
  console.log(Product.length);
  res.render('shop/index', { title: 'Menu', Product: Product });
});
});


router.get('/hot', function(req, res, next) {
  Product.find({'category' : 'hot', 'size' : 'small'},function(err, Product){
  console.log(Product.length);
  res.render('hot', { title: 'Hot Drinks', Product: Product });
});
});

router.get('/cold', function(req, res, next) {
  Product.find({'category' : 'cold', 'size' : 'small'},function(err, Product){
  console.log(Product.length);
  res.render('cold', { title: 'Cold Drinks', Product: Product });
});
});

router.get('/food', function(req, res, next) {
  Product.find({'category' : 'food', 'size' : 'small'},function(err, Product){
  console.log(Product.length);
  res.render('food', { title: 'Food Items', Product: Product });
});
});

module.exports = router;

/** Requires user to be logged in */
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/users/signin');
}
