var express = require("express");
var cors = require("cors");
var path = require("path");
var app = express();

app.use(cors());
app.use(express.json());

app.listen(3000, function () {
    console.log("App started on port 3000");
});

app.use(function(request, response, next){
    console.log("In comes a request of method " + request.method + " to URL " + request.url);
    next();
});

app.get("/lessons", function(request, response) {
    response.json([
        {
            title: 'Painting and Drawing',
            id: 1001,
            location: 'Hendon',
            price: 49.99,
            image: "art.jpg",
            imageText: "Art Lesson Image",
            availability: 5
        },
        {
            title: 'Sculpture and Clay Modelling',
            id: 1002,
            location: 'Hendon',
            price: 59.99,
            image: "sculptor.jpeg",
            imageText: "Sculpture Lesson Image",
            availability: 5
        },
        {
            title: 'Photography Basics',
            id: 1003,
            location: 'Hendon',
            price: 39.99,
            image: "photography.webp",
            imageText: "Photography Lesson Image",
            availability: 5
        }
    ]);
});

// Set up the path where your static files are
var publicPath = path.resolve(__dirname, "images");

// Send the static files from the publicPath directory
app.use("/images", express.static(publicPath));

// If file not found, return error message
app.use("/images", function(request, response){
    response.status(404).send("Image not found!");
});

app.post("/orders", function(request, response){
    var order = request.body;
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
    response.json({message: "Order received!"});
})

app.use(function (request, response, next) {
    response.status(404).send("Request not recognised");
});



