const express = require("express"); //To create a server
//const request = require("request-promise"); //To make HTTP calls to the Root API
const ENVS = require("./envs.json");

const App = require("./App");
const tools = require("./tools");

const projectEnv = tools.getEnv(ENVS, projectId ? projectId : "testLocal");

const ROOT_API_ENDPOINT = "https://sandbox.root.co.za/v1/insurance";
// Basic authentication, user=organization API key, password=blank
const ORG_API_KEY =
  "sandbox_YTA0YmVmYjAtNWUwMC00MzY5LWE4ZjQtOTdiYzgxMGYyYTdhLnBsRFVQWTBGNEphTHFsVF9BZ3lqNkR3UlVBbDJXUWE0";
const AUTH_TOKEN = "Basic " + ORG_API_KEY + ":";

//Create an express server and define a parsing strategy on it.
const server = express();
server.use(
  bodyParser.urlencoded({
    //Use deep parsing to deal with nested objects
    extended: true
  })
);

//Specify the use of json
server.use(bodyParser.json());

//REST Endpoint for getting a root_term insurance quote
server.post("/get-insurance-term-quote", function(req, res) {
  //Extract the parameters from the request object
  if (!req.body.result || !req.body.result.parameters) {
  }
  const {
    driverAge,
    accidentCount,
    distance,
    vehicleType
  } = req.body.result.parameters;

  console.log(
    `driverAge=${driverAge},accidentCount=${accidentCount},distance=${distance},vehicleType=${vehicleType}`
  );

  if (device != null) {
    let reqUrl = encodeURI(ROOT_API_ENDPOINT + "/quotes");

    const options = {
      method: "POST",
      headers: {
        username: CLIENT_ID,
        password: CLIENT_SECRET,
        authorization: AUTH_TOKEN
      },
      uri: reqUrl,
      form: {
        type: "root_gadgets",
        model_name: device
      },
      json: true
    };

    request(options, function(error, response, body) {
      if (error) {
        res.send(error);
      }

      //Extract quotes from response
      let comprehensive_insurance_quote = body[0];
      let theft_insurance_quote = body[1];

      if (comprehensive_insurance_quote === undefined) {
        //Send error result back to DialogFlow if device not found
        var errorMessage =
          "I cannot seem to find any information on file for your device. I will give you a call shortly to resolve this";
        return res.json({
          speech: errorMessage,
          displayText: errorMessage,
          source: "get-insurance-quote"
        });
      }

      //Send comprehenisive insurance amount back to DialogFlow (Using suggested_premium value)
      var responseMessage =
        "Comprehensive insurance of your device will cost R" +
        comprehensive_insurance_quote.suggested_premium / 100.0 +
        " per month";
      return res.json({
        speech: responseMessage,
        displayText: responseMessage,
        source: "get-insurance-quote"
      });
    });
  }
});

server.listen(3000, () => console.log("Listening on port 3000"));
