var express = require("express");
var router = express.Router();

const FoodItems = require("../models/dashboard");
const VendorDetails = require("../models/Vendor");

router.get("/", function(req, res) {
    FoodItems.find(function(err, food) {
		if (err) {
			console.log(err);
		} else {
			res.json(food);
		}
	})
});

router.post("/delete", function(req, res) {
    console.log("Hello");
    console.log(req.body);
    FoodItems.findOneAndDelete({ _id: req.body._id}).then(user => {
        if (!user) {
            return res.status(400).send("Food not found");
        }
        else{
            return res.status(200).send("Deleted");
        }
    });
});

router.post("/rating", function(req, res) {
    console.log("Hello");
    console.log(req.body);
    FoodItems.findOne({ _id: req.body._id}).then(user => {
        if (!user) {
            return res.status(400).send("Food not found");
        }
        else{
            FoodItems.findByIdAndUpdate(req.body._id, {
                $set: {
                    rating: (user.rating*user.buyerCount + req.body.rating)/(user.buyerCount + 1),
                    buyerCount: user.buyerCount + 1
                }
            }, { new: true }).then(user => {
                res.status(200).send(user);
            })
        }
    });
});

router.post("/getRating", function(req, res) {
    console.log("Hello Therez");
    console.log(req.body._id);
    FoodItems.findOne({ _id: req.body._id}).then(user => {
        if (!user) {
            console.log("Helllllllllo")
            return res.status(400).send("Food not found");
        }
        else{
            console.log("Heree")
            res.status(200).send(user);
        }
    });
});

router.post("/getVendorItems", function(req, res) {
    FoodItems.find({ email: req.body.email}).then(user => {
        if (!user) {
            return res.status(400).send("Food not found");
        }
        else{
            console.log("Heree")
            res.status(200).send(user);
        }
    })
});

router.post("/getVendorDetails", function(req, res) {
    VendorDetails.find({ email: req.body.email}).then(user => {
        if (!user) {
            return res.status(400).send("Food not found");
        }
        else{
            console.log("Heree")
            res.status(200).send(user);
        }
    })
});

module.exports = router;