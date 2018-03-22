const express = require("express");

const Api = require("./Api");
const Controller = require("./Controller");
const RootClient = require("./RootClient");

class App {
  constructor(env) {
    const rootClient = new RootClient(env.rootCredentials);
    const controller = new Controller(rootClient);
    const api = new Api(controller);

    this.api = express();
    this.api.use("/insurance", api.server());
  }

  server() {
    return this.api;
  }
}

module.exports = App;
