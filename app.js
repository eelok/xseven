var express = require('express');
var handlebars = require('express-handlebars');
var  app = express();
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

app.get('/contact.html', function(req, res){  
  res.render('contact');
});

app.get('/experience.html', function(req, res){  
  res.render('experience');
});
