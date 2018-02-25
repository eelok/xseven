var express = require('express');
var handlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var  app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var port = process.env.PORT || 8080;

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
  res.render('about', {about: true});
});

app.get('/experience', function(req, res){  
  res.render('experience', {experience: true});
});

app.get('/contact', function(req, res){  
  res.render('contact', {contact: true});
});

app.post('/contact', urlencodedParser, function(req, res){  
  console.log(req.body);
  sendMail(req.body)
  res.render('contact-reply', {data: req.body});  
});

function createTransport() {    
  return nodemailer.createTransport({
    service: "Mail.Ru",
    auth: {
        user: process.env.XSEVEN_EMAIL,
        pass: process.env.XSEVEN_PASSWORD
    }
  });  
}
function sendMail(reqBody) {
  var transporter = createTransport();

  const mailOptions = {
    from: process.env.XSEVEN_EMAIL,
    to: process.env.XSEVEN_EMAIL,
    subject: `Message from: ${reqBody.name}, ${reqBody.email}`,
    html: reqBody.message
  }
  console.log('mail options', mailOptions);

  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
  });
}
