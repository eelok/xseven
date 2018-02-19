var express = require('express');
var  app = express();
var port = 2727;

app.set('view engine', 'ejs');
app.use('/css', express.static('css'));
app.listen(port);


app.get('/', function(req, res){
  // res.sendFile(__dirname + '/index.html');
  res.render('index');
});

app.get('/contact.html', function(req, res){
  // res.sendFile(__dirname + '/contact.html');
  res.render('contact');
});

app.get('/experience.html', function(req, res){
  // res.sendFile(__dirname + '/experience.html')
  res.render('experience');
})

app.get('/profile/:name', function(req,res){
  var data = {age: 29, job: 'ninja', hobbies: ['eating', 'fighting', 'fishing']};
  res.render('profile', {person: req.params.name, data: data});
});
