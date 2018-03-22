const express = require("express");

const Api = require("./Api");
const Controller = require("./Controller");
const OltioClient = require("./RootClient.js");

class App {
  constructor(env) {
    const rootClient = new RootClient(env.rootCredentials);
    const controller = new Controller(env.siteUrl, rootClient);
    const api = new Api(controller);

    this.api = express();
    this.api.use("/edt", edt.server());
  }

  server() {
    return this.api;
  }
}

module.exports = App;