var express = require("express");
var cors = require("cors");
var app = express();
app.use(cors());


app.use(function (request, response) {
    console.log("In comes a request to: " + request.url);
    response.json([
        {
            title: 'Painting and Drawing',
            id: 1001,
            location: 'Hendon',
            price: 49.99,
            image: "images/art.jpg",
            imageText: "Art Lesson Image",
            availability: 5
        },
        {
            title: 'Sculpture and Clay Modelling',
            id: 1002,
            location: 'Hendon',
            price: 59.99,
            image: "images/sculptor.jpeg",
            imageText: "Sculpture Lesson Image",
            availability: 5
        },
        {
            title: 'Photography Basics',
            id: 1003,
            location: 'Hendon',
            price: 39.99,
            image: "images/photography.webp",
            imageText: "Photography Lesson Image",
            availability: 5
        }
    ]);
});

app.listen(3000, function () {
    console.log("App started on port 3000");
});