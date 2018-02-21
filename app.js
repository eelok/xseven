var express = require('express');
var handlebars = require('express-handlebars');
var bodyParser = require('body-parser');

var  app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var port = 2727;
app.engine('hbs', handlebars({   
  extname: '.hbs',
  partialsDir  : [    
    __dirname + '/views/partials',
  ]
})); 

app.set('view engine', 'hbs');
app.use('/assets', express.static('assets'));
app.listen(port, function() {
  console.log("http://localhost:" + port);
});

app.get('/', function(req, res) {  
  res.render('index');
});

app.get('/contact', function(req, res){  
  res.render('contact');
});

app.post('/contact', urlencodedParser, function(req, res){  
  console.log(req.body);
  res.render('contact-reply', {data: req.body});
});

app.get('/experience', function(req, res){  
  res.render('experience');
});
