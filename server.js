var express = require("express");
var app = express();
app.use(express.static(__dirname + '/'));

var server = app.listen(4000, function(){
    var port = server.address().port;
    console.log("Listening on port " + port);
});
