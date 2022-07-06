const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const VendorSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
        unique: true
	},
    utype: { 
        type: String,
        required: true
    },
    cnum: { 
        type: String,
        required: false
    },
    otime: { 
        type: Date,
        required: false
    },
    ctime: { 
        type: Date,
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
    canteen:{
		type: String,
		required: false
	},

    manager:{
        type: String,
        required: false
    }
});

module.exports = User = mongoose.model("Vendors", VendorSchema);
