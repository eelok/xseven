var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var port = 4242;

app.use(express.static(path.join(__dirname, 'app')));

var server = app.listen(port, function() {
  console.log('Magic happens on port ' + port);
});

app.post('/receive-message', function(request, response) {
    console.log(request.body);
});