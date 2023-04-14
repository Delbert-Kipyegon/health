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

function sendAirtime(){



try {
  app.post("/", (req, res) => {
    const formData = req.body;
    // const phoneNo = formData.phone
    const phoneNo = "254792961634"

//  console.log(typeof(phoneNo)); // string
  const options = {
    recipients: [{
        phoneNumber: phoneNo, // value from frontend
        currencyCode: "KES",
        amount: "5"
    }
  ]
};

console.log(options.recipients) /// logs 0792961634 as entered in the front end 
// [ { phoneNumber: '0792961634', currencyCode: 'KES', amount: '5' } ]

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

}


sendAirtime();

// Listening on specified PORT
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });

 

