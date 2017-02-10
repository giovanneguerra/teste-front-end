var express = require('express');
var app = express();
var path = require('path');
var chalk = require('chalk');
var axios = require('axios');


app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + "/app/index.html"));
    app.use("/", express.static(__dirname + "/app/"));
});

app.get('/movie', function(req, res){
    res.sendFile(path.join(__dirname + "/app/movie.html"));
    app.use("/", express.static(__dirname + "/app/"));
});


app.listen(3030, function(){
    console.log(chalk.bgGreen.white.bold("Working!!"));
});
