/**
 * server.js
 * @author Brynden Bielefeld (2022)
 * 
 * Serves as the entry point for the Medical Supply Manager server.
 */
const express    = require("express");
const bodyParser = require("body-parser");
const path       = require("path");
const cors       = require("cors");
const router     = require("./routes/router.js");

const serverConfig = require(path.resolve("./data/server.config.json"));

let server = express();

server.use(cors({ origin: "*" }));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(router(server));

server.listen(serverConfig.host.port, () => {
    console.log("Server is active at %s:%d", serverConfig.host.name, serverConfig.host.port);
});