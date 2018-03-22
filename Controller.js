const uuid = require("uuid/v4");
// Decimal library is required to ensure correct handling of numbers (Javascript doesn't do so well with floating point)
const Decimal = require("decimal");
const authState = require("./auth-state-constants.json");

class Controller {
  constructor(siteUrl) {
    this.siteUrl = siteUrl;
    this.rootClient = rootClient;
  }

  getQuote(trustToken, password) {
    return this.sgClient.verifyTrustToken(trustToken).then(result => {
      const emCertId = result.subject_id;
      if (!emCertId) {
        return Promise.reject(`no such trusttoken: ${trustToken}`);
      }

      return this.storage
        .setSessionStatus(sessionId, "ACTIVE")
        .then(() =>
          Promise.resolve({ sessionId: sessionId, redirect: "/home" })
        );
    });
  }
}

module.exports = Controller;
