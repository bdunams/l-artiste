const express = require('express');
const router = express.Router();

const db = require("../models");

// ADD item to the database
router.post('/addtocart', function(req, res) {
	db.Orders.create({
		where: {
			title: req.body.title,
			price: req.body.price,
			quantity: 1
		}
	});
	res.redirect('/cart');
});

// GET order from the database
router.get('/getcart', function(req, res) {
	db.Orders.findOne({
		where: {
			id: user.dataValues.id
		}
	}).then(function(cart) {
		res.render('cart', 
		{
			user: user,
			item: itemID,
			title: title,
			price: price,
			quantity: 1
		});
	});
});

// Calculating the total amount of the cart
router.get('/countproducts', function(req, res) {
	db.sum('price').then(function(sum) {
		res.render('cart');
	});
});

// Checkout from the cart
router.post('/checkout', function(req, res) {
	db.Orders.destroy({ where: {}});
});




// CHECKOUT from the cart
/*router.post('/checkout', function(req, res) {
	data.cartCheckout(req.body.name);
	res.redirect('/cart');
});

// To count number of product in the cart
router.get('/countproducts', function(req, res) {
	data.noofproducts().then((count) => {
		re.send('' + count);
	});
});



module.exports = router;

// Functions
function getProducts () { return Product.findAll(); } // end of the function getProducts

function addToProducts(product) // definition of the function addToProducts
{
    // Product.findById(product.id).then(cartItem => {
    //     return;
    // })
    return Product.create(
        {
            name: product.name,
            price: product.price,
            quantity: 1,
        });
} // end of the function definition

function addToCart (product) // definition of the function addToCart
{
    CartProduct.findById(product.id).then(cartItem => {
        cartItem.increment('quantity', {by: product.quantity});
        cartItem.increment('amount', {by: product.amount});
        return cartItem;
    })
    return CartProduct.create(
        {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: product.quantity,
            amount: product.amount
        });
} // end of the function addToCart

function getCart() // definition of the function getCart
{
    if (CartProduct.findAll())
        return CartProduct.findAll();
    else
        return 0;
} // end of the function getCart

function decrementCart(cartItemID) // definition of the function decrementCart
{
    CartProduct.findById(cartItemID).then(user => {
        user.decrement('quantity', {by: 1});
    user.decrement('amount', {by: user.price});
})
} // end of the function decrementCart

function incrementCart(cartItemID) // definition of the function incrementCart
{
    CartProduct.findById(cartItemID).then(user => {
        user.increment('quantity', {by: 1});
    user.increment('amount', {by: user.price});
})
} // end of the function incrementCart

function noofproducts() // definition of the function noofproducts
{
    if(CartProduct.sum('quantity'))
        return CartProduct.sum('quantity');
    else
        return 0;
} // end of the function noofproducts

function totalamount() // definition of the function totalamount
{
    if(CartProduct.sum('amount'))
        return CartProduct.sum('amount');
    else
        return 0;
} // end of the function totalamount

function cartCheckout(data) { CartProduct.destroy({ where: {}}); } // end of the function cartCheckout

function delFromCart(cartItemID) // definition of the function delFromCart
{
    return CartProduct.destroy(
        {
            where:
                {
                    id: cartItemID
                }
        });
} // end of the function delFromCart

module.exports = {
    getProducts,
    addToCart,
    addToProducts,
    getCart,
    cartCheckout,
    noofproducts,
    totalamount,
    delFromCart,
    incrementCart,
    decrementCart
};*/