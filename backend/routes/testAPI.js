var express = require("express");
var router = express.Router();

// GET request 
// Just a test API to check if server is working properly or not
router.get("/", function(req, res) {
	res.send(String(X));
});

router.get("/weirdchecker", function(req, res) {
	res.send("LMAO DEAD !");
});

module.exports = router;