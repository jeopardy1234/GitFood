const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Details = mongoose.Schema({
    foodID: String,
    quantity: Number,
    addons: {
        'Cheese': Number,
        'Mayo': Number,
        'Oregano': Number,
        'Butter': Number,
        'Egg': Number,
    },
    netCost: Number,
    vendor: String,
    time: Date,
    timeStr: String,
    vendorEmail: String,
    foodName: String,
    status: String,
    rated: Boolean,
    otime: Date,
    ctime: Date,
});

const OrderSchema = new Schema({
	email:{
        type: String,
        required: true
    },
    orders:{
        type: [Details],
        required: false
    },
});

module.exports = User = mongoose.model("Orders", OrderSchema);
