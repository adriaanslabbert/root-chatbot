const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")({
  origin: true
});

class Api {
  constructor(controller) {
    this.controller = controller;
    this.apiServer = express();

    this.apiServer.use(cors);
    this.apiServer.use(bodyParser.json());

    this.apiServer.post("/getTermQuote", (req, res) => {
      if (!req.body.result || !req.body.result.parameters) {
      }
      const {
        driverAge,
        driverGender,
        driverEducation,
        accidentCount,
        distance,
        vehicleType
      } = req.body.result.parameters;

      console.log(
        `driverAge=${driverAge},driverGender=${driverGender},driverEducation=${driverEducation},accidentCount=${accidentCount},distance=${distance},vehicleType=${vehicleType}`
      );

      this.controller
        .getQuote(
          driverAge,
          driverGender,
          driverEducation,
          accidentCount,
          distance,
          vehicleType
        )
        .then(result => {
          res.json(result);
        })
        .catch(err => {
          if (err) console.log(err);
          res.status(401).end();
        });
    });
  }

  server() {
    return this.apiServer;
  }
}

module.exports = Api;
