const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const DB_NAME = "mongodb+srv://jeopardy:123@cluster0.fcpun.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const X = require('./models/dashboard');



// routes
var testAPIRouter = require("./routes/testAPI");
var UserRouter = require("./routes/Users");
var foodRouter = require("./routes/food");
var orderRouter = require("./routes/orders");
// X.insertMany([{ product: "maggi", price: 35, canteen: "BBC", rating: "4", vendor: "Ramesh", type:"veg", tags: { sweet: false, spicy: true, sour: false, salty: true } },
// { product: "dosa", price: 60, canteen: "BBC", rating: 3, vendor: "Suresh" , type:"veg", tags: { sweet: false, spicy: false, sour: false, salty: true } },
// { product: "burger", price: 70, canteen: "VC", rating: 5, vendor: "Kamlesh" , type:"veg", tags: { sweet: true, spicy: false, sour: false, salty: false } },
// { product: "oreo", price: 32, canteen: "JC", rating: 5, vendor: "Ramesh" , type:"veg", tags: { sweet: true, spicy: false, sour: false, salty: false } },
// { product: "biryani", price: 42, canteen: "VC", rating: 5, vendor: "Dharmesh" , type:"nveg", tags: { sweet: false, spicy: true, sour: false, salty: true } },
// { product: "lollipop", price: 32, canteen: "JC", rating: 5, vendor: "Naagesh" , type:"nveg",tags: { sweet: true, spicy: false, sour: true, salty: false }},
// { product: "karela", price: 120, canteen: "BBC", rating: 1, vendor: "Naagesh" , type:"veg",tags: { sweet: false, spicy: false, sour: true, salty: false }}])
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB
mongoose.connect(DB_NAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB Connected…")
  })
  .catch(err => console.log(err))
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})

// setup API endpoints
app.use("/testAPI", testAPIRouter);
app.use("/user", UserRouter);
app.use("/food", foodRouter)
app.use("/order", orderRouter)
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
