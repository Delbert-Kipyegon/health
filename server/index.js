const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const bodyParser = require("body-parser");
const credentials = {
  apiKey: '97e412c12d23bf441f74c1b0088190ef69af2c2c93e2cba248c182924e29e237',
  username: 'testprime'
}
const AfricasTalking = require('africastalking')(credentials)
const airtime = AfricasTalking.AIRTIME

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(bodyParser.json());

try {
  app.post("/", (req, res) => {
    const formData = req.body;
    console.log(formData.phone);
    // Process the form data as needed
    // res.send("Form data received!");
  });
    
} catch (error) {
  console.log(error)
}

const options = {
    recipients: [{
        phoneNumber: "formData.phone", // value from frontend
        currencyCode: "KES",
        amount: "1"
    }]
};

airtime.send(options)
    .then( response => {
        console.log(response);
    })
    .catch( error => {
        console.log(error);
    });


    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });