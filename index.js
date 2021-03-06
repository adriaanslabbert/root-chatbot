const express = require("express"); //To create a server
const ENVS = require("./envs.json");

const App = require("./App");
const tools = require("./tools");

const projectEnv = tools.getEnv(ENVS, "testLocal");

const app = new App(projectEnv);

const server = express();
server.use("/api", app.server());
server.listen(16384);
