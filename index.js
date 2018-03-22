const express = require("express"); //To create a server
const ENVS = require("./envs.json");

const App = require("./App");
const tools = require("./tools");

const projectEnv = tools.getEnv(ENVS, projectId ? projectId : "testLocal");

const app = new App(projectEnv);

const server = express();
server.use("/api", app.server());
exports.server = functions.https.onRequest(server);

//REST Endpoint for getting a root_term insurance quote
server.post("/get-insurance-term-quote", function(req, res) {
  //Extract the parameters from the request object

  if (device != null) {
    let reqUrl = encodeURI(ROOT_API_ENDPOINT + "/quotes");
  }
});
