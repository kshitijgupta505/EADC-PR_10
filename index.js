var express = require('express');

var PORT;
var Cloudant = require('@cloudant/cloudant');


if (process.env.PORT) {
  PORT = process.env.PORT;
} else {
  PORT = 8000;
}
var Cloudant = require('@cloudant/cloudant');
var url = "https://apikey-v2-17x5gjtg8kr6hcylr0e8ru0gzshshcih4k10lvx56a9s:875f7c35c068f5916e827a04c02aba3f@db29aed2-d38b-430f-8508-998962a1d54f-bluemix.cloudantnosqldb.appdomain.cloud";
var username = "apikey-v2-17x5gjtg8kr6hcylr0e8ru0gzshshcih4k10lvx56a9s";
var password = "875f7c35c068f5916e827a04c02aba3f";
var app = express();
const bodyParser = require('body-parser');
//const cors = require('cors');
//app.use(cors());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
////////////
app.post('/insert', (req, res) => {

  const { name, email, phone, city, country, pincode, database } = req.body;
  
  const data = {
      name: name,
      email: email,
      phone: phone,
      city: city,
      country: country,
      pincode: pincode
  };
///////
Cloudant({ url: url, username: username, password: password }, function(err, cloudant, pong) {
  if (err) {
    return console.log('Failed to initialize Cloudant: ' + err.message);
  }
console.log(pong); // {"couchdb":"Welcome","version": ..

cloudant.use(database).insert({ "name": name, "email": email , "phone": phone, "city": city , "country": country , "pincode": pincode } , (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data); // { ok: true, id: 'rabbit', ...
      }
    });
});

});


app.listen(PORT);
//console.log(message.getPortMessage() + PORT);



