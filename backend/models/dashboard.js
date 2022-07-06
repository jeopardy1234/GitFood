const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const FoodTags = mongoose.Schema({
    beverage: Boolean,
    sweet: Boolean,
    spicy: Boolean,
    sour:  Boolean,
    salty: Boolean,
});

const addons = mongoose.Schema({
    cheese: Number,
    oregano: Number,
    mayo: Number,
    butter: Number,
    egg: Number,
});

const DashSchema = new Schema({
	product: {
		type: String,
        required: true
	},
    price: {
        type: Number,
        required: true
    },
    canteen: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: false
    },
    vendor: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: true
    },
    tags: {
        type: FoodTags,
        required: true
    },
    addons:{
        type: addons,
        required: false
    },
    email:{
        type: String,
        required: true
    },
    buyerCount: {
        type: Number,
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

});

module.exports = User = mongoose.model("Dashboard", DashSchema);
