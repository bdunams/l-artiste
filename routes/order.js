const express = require('express');
const router = express.Router();

const db = require("../models");

// GET cart
router.get('/cart', function(req, res, next) {

    db.Orders.findAll({})
        .then((orders) => {
            res.render('cart', 
            {
                orders: orders
            });
        })
});

// ADD item to the cart
router.post('/', function(req, res, next) {
	
    let item = req.body.name;
    let price = req.body.price;
    let quantity = 1;
    let UserId = req.user.id;

    db.Orders.findOrCreate({
        where: {
            item: item,
            price: price,
            quantity: quantity,
            UserId = UserId
        }
    });
    
	res.redirect('/cart');
});

module.exports = router;
