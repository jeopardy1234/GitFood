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
    buyerEmail: String,
    foodName: String,
    orderID: String,
    status: String,
});

const OrderSchema = new Schema({
	email:{
        type: String,
        required: true
    },
    orders:{
        type: [Details],
        required: false
    }
});

module.exports = User = mongoose.model("OrdersVendor", OrderSchema);
