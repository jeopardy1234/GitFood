var express = require("express");
var router = express.Router();

const Orders = require("../models/ordersBuyer");
const OrdersVendor = require("../models/ordersVendor");

// GET request 
// Getting all the users
router.post("/buyBuyer", function(req, res) {
    console.log("HELLO");
    console.log(req.body)
    Orders.findOneAndUpdate(
        { email: req.body.email },
        { $push: { orders: req.body.orders } },
        { new: true, upsert: true },
        function(err, doc) {
            if (err) {
                console.log("Something wrong when updating data!");
            }
            else{
                console.log("Data updated successfully !");
                Orders.findOne({ email : req.body.email }).then(user => {
                    if (user) {
                        console.log("Hello:\n",user.orders[user.orders.length-1]._id);
                        res.send(user.orders[user.orders.length-1]._id);
                    }
                });
            
            }
        }
    );
});

router.post("/buyVendor", function(req, res) {
    console.log("HELLO");
    console.log(req.body)
    OrdersVendor.findOneAndUpdate(
        { email: req.body.email },
        { $push: { orders: req.body.orders } },
        { new: true, upsert: true },
        function(err, doc) {
            if (err) {
                console.log("Something wrong when updating data!");
            }
            console.log(doc);
            res.json(doc);
        }
    );
});

const Food = require("../models/dashboard");


router.post("/add", function (req, res) {
    console.log("HELLO");
    const NewFood = new Food({
        product: req.body.food,
        price: req.body.price,
        type: req.body.ftype,
        tags: {
            beverage: req.body.tags.includes("Beverage"),
            sweet: req.body.tags.includes("Sweet"),
            spicy: req.body.tags.includes("Spicy"),
            sour: req.body.tags.includes("Sour"),
            salty: req.body.tags.includes("Salty")
        },
        addons: {
            cheese: req.body.cheese,
            oregano: req.body.oregano,
            mayo: req.body.mayo,
            butter: req.body.butter,
            egg: req.body.egg
        },
        canteen: req.body.canteen,
        vendor: req.body.vendor,
        rating: 0,
        buyerCount: 0,
        time: req.body.time,
        timeStr: req.body.timeStr,
        email: req.body.email,
        otime: req.body.otime,
        ctime: req.body.ctime,
    })

    Food.findOne({ product: req.body.food, canteen: req.body.canteen }).then(user => {
        if (!user) {
            NewFood.save().then(user => res.json(user));
        }
        else {
            return res.status(400).send("User Exists");
        }
    });
});

router.post("/edit", function (req, res) {
    console.log("HELLO THERE");
    Food.findOneAndUpdate({ _id: req.body._id }, {
        $set: {
            product: req.body.food, price: req.body.price, type: req.body.ftype, tags: {
                beverage: req.body.tags.includes("Beverage"),
                sweet: req.body.tags.includes("Sweet"),
                spicy: req.body.tags.includes("Spicy"),
                sour: req.body.tags.includes("Sour"),
                salty: req.body.tags.includes("Salty")
            },
            addons: {
                cheese: req.body.cheese,
                oregano: req.body.oregano,
                mayo: req.body.mayo,
                butter: req.body.butter,
                egg: req.body.egg
            },
            canteen: req.body.canteen,
            vendor: req.body.vendor,
            rating: req.body.rating
        }

    }, { new: true}).then(user => { 
        console.log("HII: ", user);
        res.status(200).send(user); })
});

router.post("/buyer", function (req, res) {
    console.log(req.body);
    Orders.find({email: req.body.email},function (err, users) {
        if (err) {
            req.status(400).send(err);
        } else {
            res.status(200).send(users);
        }
    })
});

router.post("/vendor", function (req, res) {
    console.log(req.body);
    OrdersVendor.find({email : req.body.email},function (err, users) {
        if (err) {
            req.status(400).send(err);
        } else {
            res.status(200).send(users);
        }
    })
});

router.post("/change", function (req, res) {
    OrdersVendor.findOneAndUpdate({ 'orders.orderID' : req.body.orderID }, {
        $set: {
            'orders.$.status': req.body.status
        }

    }, { new: true }).then(user => {
        res.status(200).send(user);
    })
});

router.post("/change1", function (req, res) {
    Orders.findOneAndUpdate({ 'orders._id' : req.body.orderID }, {
        $set: {
            'orders.$.status': req.body.status
        }

    }, { new: true }).then(user => {
        console.log("Hello from: ", user)
        res.status(200).send(user);
    })
});

router.post("/rated", function (req, res) {
    console.log(req.body);
    Orders.findOneAndUpdate({ 'orders._id' : req.body.item_id }, {
        $set: {
            'orders.$.rated': true
        }
    }, { new: true }).then(user => {
        console.log(user)
        res.status(200).send(user);
    })
});

module.exports = router;