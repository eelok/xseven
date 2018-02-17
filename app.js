var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
app.use(bodyParser.urlencoded({ extended: false }));

var port = 4242;

app.use(express.static(path.join(__dirname, 'app')));

var server = app.listen(port, function() {
  console.log('Magic happens on port ' + port);
});

function sendEmail(contactData) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: process.env.XSEVEN_EMAIL,
               pass: process.env.XSEVEN_PASSWORD
           }
       });

    const mailOptions = {
        from: contactData.email,
        to: process.env.XSEVEN_EMAIL,
        subject: `Message from: ${contactData.name}, ${contactData.email}`,
        html: contactData.message
    };
      
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.error(err);
        } else {
          console.log(info);
        }
     });
}

app.post('/receive-message', function(request, response) {    
    sendEmail(request.body);  
    response.sendfile("app/contact.html");
});