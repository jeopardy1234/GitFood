var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/Buyer");
const Vendor = require("../models/Vendor");

// GET request 
// Getting all the users
router.get("/", function (req, res) {
    User.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});


router.get("/buyers", function (req, res) {
    User.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

router.get("/vendors", function (req, res) {
    Vendor.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/register", (req, res) => {
    if (req.body.utype == '1') {
        const newBuyer = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            cpassword: req.body.confirmPassword,
            cnum: req.body.contact,
            bname: req.body.batch,
            utype: req.body.utype,
            age: req.body.age,
            wallet: 0
        });
        if (newBuyer.password === newBuyer.cpassword) {
            newBuyer.save()
                .then(user => {
                    res.status(200).json(user);
                })
                .catch(err => {
                    res.status(400).send(err);
                });
        }
        else {
            res.status(400).send("Passwords do not match");
        }
    }
    else {
        const newVendor = new Vendor({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            cpassword: req.body.confirmPassword,
            cnum: req.body.contact,
            otime: req.body.canteenOpeningTime,
            ctime: req.body.canteenClosingTime,
            utype: req.body.utype,
            canteen: req.body.canteen,
            manager: req.body.manager,
        });

        if (newVendor.password === newVendor.cpassword) {
            newVendor.save()
                .then(user => {
                    res.status(200).json(user);
                })
                .catch(err => {
                    res.status(400).send(err);
                });
        }
        else {
            res.status(400).send("Passwords do not match");
        }
    }
});

// POST request 
// Login

router.post("/login", (req, res) => {
    const email = req.body.email;
    var fnd = 0
    console.log(email)
    User.findOne({ email }).then(user => {
        if (user) {
            console.log(user.password)
            console.log(req.body.password)
            if (user) {
                if (user.password == req.body.password) {
                    console.log("found")
                    fnd = 1
                    console.log(fnd)
                    return res.status(200).send(user);
                }
            }
        }

        if (!fnd) {
            Vendor.findOne({ email }).then(user1 => {
                if (user1) {
                    if (user1.password == req.body.password) {
                        console.log(user1.password)
                        console.log(req.body.password)
                        fnd = 1;
                        return res.status(200).send(user1);
                    }
                }
                if (!fnd)
                    return res.status(400).json({ "message": "Invalid Credentials" });
            });
        }
    });

});

router.post("/update", function (req, res) {
    if (req.body.utype == '1') {
        email = req.body.email;
        console.log(req.body.MyArray)
        User.findOne({ email }).then(user => {
            if (user) {
                const X = User.findOneAndUpdate({ email: email }, {
                    $set:
                    {
                        name: req.body.MyArray[0],
                        email: req.body.MyArray[1],
                        cnum: req.body.MyArray[2],
                        age: req.body.MyArray[3],
                        bname: req.body.MyArray[4],
                        wallet: req.body.MyArray[5]
                    },
                }, { new: true, upsert: true, useFindAndModify: false }).then(user => { res.status(200).send(user) })
                console.log(X)
            }
        });
    }
    else {
        email = req.body.email;
        console.log(req.body.MyArray)
        Vendor.findOne({ email }).then(user => {
            if (user) {
                const Y = Vendor.findOneAndUpdate({ email: email }, {
                    $set:
                    {
                        name: req.body.MyArray[0],
                        manager: req.body.MyArray[1],
                        email: req.body.MyArray[2],
                        cnum: req.body.MyArray[3],
                        canteen: req.body.MyArray[4],
                        otime: req.body.MyArray[5],
                        ctime: req.body.MyArray[6],
                    }
                }, { new: true, upsert: true }).then(user1 => { res.status(200).send(user1) })
                console.log(Y)
            }
        });
    }
});

router.post("/updateKash", function (req, res) {
    email = req.body.email;
    User.findOneAndUpdate({ email: email }, {
        $set:
        {
            wallet: req.body.wallet
        },
    }, { new: true, upsert: true }).then(user => { res.status(200).send(user) })
});

router.post("/addCash", function (req, res) {
    email = req.body.email;
    console.log(req.body)
    User.findOne({ email: email }).then(user => {
        console.log(user)
        User.findOneAndUpdate({ email: email }, {
            $set:
            {
                wallet: req.body.cash + user.wallet
            },
        }, { new: true, upsert: true }).then(user => { res.status(200).send(user); console.log(user) })
    });
});

module.exports = router;

