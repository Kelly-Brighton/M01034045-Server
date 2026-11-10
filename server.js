var express = require("express");
var cors = require("cors");
var path = require("path");
var app = express();
require("dotenv").config({ path: "./config.env"});
const port = process.env.PORT || 3000;

// Mongodb connection setup
const { MongoClient, ObjectId } = require("mongodb");
const uri = process.env.MONGODB_PREFIX + process.env.MONGODB_USERNAME + ":" + 
process.env.MONGODB_PASSWORD + process.env.MONGODB_URL;
const client = new MongoClient(uri);
const db = client.db("ExtraLessons");

app.use(cors());
app.use(express.json());

app.listen(port, function () {
    console.log("App started on port " + port);
});

app.use(function(request, response, next){
    console.log("In comes a request of method " + request.method + " to URL " + request.url);
    next();
});

app.get("/lessons", async function(request, response) {
    let collection = await db.collection("Lessons");
    let results = await collection.find({}).toArray();
    response.send(results);
});



// Set up the path where your static files are
var publicPath = path.resolve(__dirname, "images");

// Send the static files from the publicPath directory
app.use("/images", express.static(publicPath));

// If file not found, return error message
app.use("/images", function(request, response){
    response.status(404).send("Image not found!");
});

app.post("/orders", async function(request, response){
    var order = request.body;
    console.log();
    console.log("New Order Details: "
        + "\nCustomer name: " + order.name
        + "\nTelephone number: " + order.phone
    );
    console.log();
    console.log("Lessons Ordered Details:");

    order.lessons.forEach(lesson => {
        console.log(
            "ID: " + lesson.id +
            "\nTitle: " + lesson.title +
            "\nPrice: £" + lesson.price +
            "\nQuantity: " + lesson.quantity
        );
        console.log();
    });

    let collection = await db.collection("Orders");
    let result = await collection.insertOne(order);
    response.send(result);
});

app.put("/lessons/:_id", async function(request, response) {
    var body = request.body;
    let collection = await db.collection("Lessons");
    let tempid = request.params._id; 

    const query = { _id: new ObjectId(tempid) };
    const updates = {
        $set: request.body
    };
    result = await collection.updateOne(query, updates);
    response.send(result);
    console.log(result);
});

app.use(function (request, response, next) {
    response.status(404).send("Request not recognised");
});



