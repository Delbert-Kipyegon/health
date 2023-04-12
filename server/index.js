// requiring dependencies

const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const bodyParser = require("body-parser");

// AT Creds fixed 
const credentials = {
  apiKey: '97e412c12d23bf441f74c1b0088190ef69af2c2c93e2cba248c182924e29e237',
  username: 'testprime'
}

const AfricasTalking = require('africastalking')(credentials)

// airtime function injected 
const airtime = AfricasTalking.AIRTIME


//handling CORS
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// Getting client data
app.use(bodyParser.json());

try {
  app.post("/", (req, res) => {
    const formData = req.body;

    
    const phoneNo = formData.phone

//  console.log(typeof(phoneNo)); // string
  const options = {
    recipients: [{
        phoneNumber: phoneNo, // value from frontend
        currencyCode: "KES",
        amount: "5"
    }]

    
};

console.log(options.recipients[0].phoneNumber) /// logs 0792961634 as entered in the front end

airtime.send(options)
    .then( response => {
        console.log(response);
    })
    .catch( error => {
        console.log(error);
    });

  });
} catch (error) {
  console.log(error)
}



// Listening on specified PORT
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });

 

