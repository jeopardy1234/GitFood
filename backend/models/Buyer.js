const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BuyerSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
        unique: true,
		required: true
	},
    utype: { 
        type: String,
        required: true
    },
    age: { 
        type: String,
        required: true
    },
    cnum: { 
        type: String,
        required: false
    },

    bname: { 
        type: String,
        required: false
    },

    password: { 
        type: String,
        required: true
    },

	cpassword:{
		type: String,
		required: true
	},

    wallet: {
        type: Number,
        required: false     
    },
});

module.exports = User = mongoose.model("Buyers", BuyerSchema);
