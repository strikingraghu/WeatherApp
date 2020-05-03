const express = require("express");
const app = express();
const https = require("https");


app.get("/", function(request, response) {
    res.send("Server is up and running fine")
});


app.get("/weather", function(req, res) {
    const weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=Bengaluru&units=metric&appid=eaad74664db8f169ab4d1437f0d32d25";
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
    console.log("Server is running on port 3000")
});