
const express = require('express');
const https = require("https");
const bodyparser = require("body-parser");

const app = express();

app.use(bodyparser.urlencoded({extended:true}));

app.get("/", (req, res) =>{

    res.sendFile(__dirname + "/index.html");

});

app.post("/", (req,res) =>{
    const city = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=11d78b8d03321059aed07cf57163b714";
    https.get(url, (response) => {
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.write("<h1>The temprature at " + city + " is " + temp + " degree celcius</h1>");
            res.write("<p>The weather is " + description + "</p>");
            res.write("<img src=" + imgURL + ">");
            res.send();
        });
    });
});

app.listen(3000, () => {
    console.log("Server is running on 3000....");
})