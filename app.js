const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    console.log(req.body.cityName);
    const query = req.body.cityName;
    const weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=metric&appid=eaad74664db8f169ab4d1437f0d32d25";
    https.get(weatherURL, function(response) {
        console.log(response.statusCode);
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            console.log(temp);
            console.log(description);
            res.write("<h1>Today's temp in Bengaluru is " + temp + " and situation is like - " + description + "!</h1>");
            res.send();
        });
    });    
});

app.listen(3000, function() {
    console.log("Server starting")
});