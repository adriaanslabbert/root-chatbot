const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")({
  origin: true
});

class Edt {
  constructor(sgClient, storage, controller) {
    this.sgClient = sgClient;
    this.storage = storage;
    this.controller = controller;
    this.apiServer = express();

    this.apiServer.use(cors);
    this.apiServer.use(bodyParser.json());

    this.apiServer.post("/enrol/credential", (req, res) => {
      const { trustToken, userName, credential } = req.body;
      console.log(
        `Enrol credential request received: user='${userName}',token='${trustToken}'`
      );
      this.controller
        .verifyCredential(trustToken, userName, credential)
        .then(success => {
          res.end();
        })
        .catch(err => {
          if (err) console.log(err);
          res.status(401).end();
        });
    });

    this.apiServer.post("/enrol/card", (req, res) => {
      const { cardNumber, trustToken } = req.body;
      console.log(
        `Enrol card request received: card='${cardNumber}',token='${trustToken}'`
      );
      this.controller
        .verifyCard(cardNumber, trustToken)
        .then(success => {
          res.end();
        })
        .catch(err => {
          if (err) console.log(err);
          res.status(401).end();
        });
    });

    this.apiServer.get("/enrol/qr/:sessionId", (req, res) => {
      const sessionId = req.params.sessionId;
      console.log(`QR generation request received: sessionId='${sessionId}'`);
      this.controller
        .createEnrolmentCode(sessionId)
        .then(enrolmentCode => {
          res.json({ code: enrolmentCode });
        })
        .catch(err => {
          if (err) console.log(err);
          res.status(401).end();
        });
    });

    this.apiServer.post("/enrol/qr", (req, res) => {
      const { trustToken, enrolmentCode } = req.body;
      console.log(
        `QR enrolment request received: code='${enrolmentCode}',token='${trustToken}'`
      );
      this.controller
        .verifyEnrolmentCode(trustToken, enrolmentCode)
        .then(userName => {
          res.json({ userName: userName });
        })
        .catch(err => {
          if (err) console.log(err);
          res.status(401).end();
        });
    });

    this.apiServer.get("/enrol/qr/status/:qr", (req, res) => {
      const enrolmentCode = req.params.qr;
      console.log(
        `QR enrolment code status request received: qr='${enrolmentCode}'`
      );
      this.controller
        .waitForEnrolment(enrolmentCode)
        .then(status => {
          res.json({ status });
        })
        .catch(err => {
          if (err) console.log(err);
          res.status(401).end();
        });
    });

    this.apiServer.post("/enrol/deregister", (req, res) => {
      const trustToken = req.body.trustToken;
      console.log(`Deregistration received: token='${trustToken}'`);
      this.controller
        .deregister(trustToken)
        .then(result => {
          res.end();
        })
        .catch(err => {
          if (err) console.log(err);
          res.status(401).end();
        });
    });

    this.apiServer.post("/login/web/credential", (req, res) => {
      const { userName, credential } = req.body;
      console.log(
        `Credential web login request received: user='${userName}', password='${credential}'`
      );
      this.controller
        .loginWeb(userName, credential)
        .then(result => {
          res.json(result);
        })
        .catch(err => {
          if (err) console.log(err);
          res.status(401).end();
        });
    });

    this.apiServer.post("/login/web/biometric", (req, res) => {
      const userName = req.body.userName;
      console.log(`Biometric web login request received: user='${userName}'`);
      this.controller
        .loginWeb(userName, null)
        .then(result => {
          res.json(result);
        })
        .catch(err => {
          if (err) console.log(err);
          res.status(401).end();
        });
    });

    this.apiServer.post("/login/mobile/credential", (req, res) => {
      const { credential, trustToken } = req.body;
      console.log(
        `Credential mobile login request received: password='${credential}',trustToken='${trustToken}'`
      );
      this.controller
        .loginMobile(trustToken, credential)
        .then(result => {
          res.json(result);
        })
        .catch(err => {
          if (err) console.log(err);
          res.status(401).end();
        });
    });

    this.apiServer.post("/login/mobile/biometric", (req, res) => {
      const trustToken = req.body.trustToken;
      console.log(
        `Biometric mobile login request received: trustToken='${trustToken}'`
      );
      this.controller
        .loginMobile(trustToken, null)
        .then(result => {
          res.json(result);
        })
        .catch(err => {
          if (err) console.log(err);
          res.status(401).end();
        });
    });

    this.apiServer.get("/login/status/:sessionId", (req, res) => {
      const sessionId = req.params.sessionId;
      console.log(`Login status request received: sessionId='${sessionId}'`);
      this.controller
        .loginStatus(sessionId)
        .then(status => {
          res.json({ status });
        })
        .catch(err => {
          if (err) console.log(err);
          res.status(401).end();
        });
    });

    this.apiServer.post("/logout/:sessionId", (req, res) => {
      const sessionId = req.params.sessionId;
      console.log(`Logout request received: sessionId='${sessionId}'`);
      this.controller
        .logout(sessionId)
        .then(username => {
          console.log(`Logged out '${username}'`);
          res.end();
        })
        .catch(err => {
          if (err) console.log(err);
          res.status(401).end();
        });
    });

    this.apiServer.post("/activate/:activationCode", (req, res) => {
      const activationCode = req.params.activationCode;
      console.log(
        `Login activation request received: code='${activationCode}'`
      );
      this.controller
        .activate(activationCode)
        .then(result => {
          res.end();
        })
        .catch(err => {
          if (err) console.log(err);
          res.status(401).end();
        });
    });

    this.apiServer.post("/pay/beneficiary", (req, res) => {
      const { sessionId, beneficiaryId, amount } = req.body;
      console.log(
        `Pay beneficiary request received: sessionId='${sessionId}', beneficiaryId='${beneficiaryId}', amount='${amount}'`
      );
      this.controller
        .payBeneficiary(sessionId, beneficiaryId, amount)
        .then(result => {
          res.json(result);
        })
        .catch(err => {
          if (err) console.log(err);
          res.status(401).end();
        });
    });

    this.apiServer.post("/pay/alexa/auth", (req, res) => {
      const { deviceId, beneficiaryId, amount } = req.body;
      console.log(
        `Pay Alexa request received: deviceId='${deviceId}', beneficiaryId='${beneficiaryId}', amount='${amount}'`
      );
      this.controller
        .payAlexa(deviceId, beneficiaryId, amount)
        .then(result => {
          res.json(result);
        })
        .catch(err => {
          if (err) console.log(err);
          res.status(401).end();
        });
    });

    this.apiServer.post("/pay/alexa/poll", (req, res) => {
      const { deviceId, authExtRef } = req.body;
      console.log(
        `Poll Alexa request received: deviceId='${deviceId}', authExtRef='${authExtRef}'`
      );
      this.controller
        .pollAlexa(deviceId, authExtRef)
        .then(result => {
          res.json(result);
        })
        .catch(err => {
          if (err) console.log(err);
          res.status(401).end();
        });
    });

    this.apiServer.post("/pay/transfer", (req, res) => {
      const sessionId = req.body.sessionId;
      const fromAccountNumber = req.body.fromAccount;
      const toAccountNumber = req.body.toAccount;
      const amount = req.body.amount;
      console.log(
        `Transfer request received: sessionId='${sessionId}',fromAccount='${fromAccountNumber}', toAccount='${toAccountNumber}', amount='${amount}'`
      );
      this.controller
        .transfer(sessionId, fromAccountNumber, toAccountNumber, amount)
        .then(result => {
          res.json(result);
        })
        .catch(err => {
          if (err) console.log(err);
          res.status(401).end();
        });
    });

    this.apiServer.post("/pay/card-not-present", (req, res) => {
      console.log("Pay CnP request received");
      //TODO
      res.status(401).send("Not implemented");
    });

    this.apiServer.post("/pay/code", (req, res) => {
      const { sessionId, transactionCode } = req.body;
      console.log(
        `Pay code request received: sessionId='${sessionId}',transactionCode='${transactionCode}'`
      );
      this.controller
        .payQrCode(sessionId, transactionCode)
        .then(result => {
          res.json(result);
        })
        .catch(err => {
          if (err) console.log(err);
          res.status(401).end();
        });
    });

    this.apiServer.post("/pay/card", (req, res) => {
      console.log("Pay card request received");
      //TODO
      res.status(401).send("Not implemented");
    });

    this.apiServer.get("/user/info/:sessionId", (req, res) => {
      const sessionId = req.params.sessionId;
      console.log(`User info request received: sessionId='${sessionId}'`);
      this.controller
        .getUserInfo(sessionId)
        .then(result => {
          res.json(result);
        })
        .catch(err => {
          if (err) console.log(err);
          res.status(401).end();
        });
    });

    this.apiServer.post("/reset-user", (req, res) => {
      const { userName, credential } = req.body;
      console.log(`Reset user: ${userName}`);

      this.controller
        .resetUser(userName, credential)
        .then(() => res.end())
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

module.exports = Edt;
