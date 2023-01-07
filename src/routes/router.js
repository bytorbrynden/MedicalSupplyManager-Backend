/**
 * routes/router.js
 * 
 * Serves as the entry point for our Express router.
 */
const express = require("express");
const router  = express.Router();

// const getRouters = require("./get/index.js");
// const postRouters = require("./post/index.js");

const transactionsRouter = require("./transactions.router.js");

module.exports = (app) => {
    // Log a message for every request to the server.
    app.use((request, response, next) => {
        var thisDate = new Date();
    
        var dateStr = (thisDate.getMonth() + 1) + "/" + thisDate.getDate() + "/" + thisDate.getFullYear();
        var timeStr = thisDate.getHours() + ":" + thisDate.getMinutes() + ":" + thisDate.getSeconds();
        var now = dateStr + " " + timeStr;

        console.log("[%s] %s request to '%s' from '%s'", now, request.method, request.path, request.ip);

        next();
    });

    // app.use(getRouters(app)); // Configure application to use appropriate router for GET requests.
    // app.use(postRouters(app)); // Configure application to use appropriate router for POST requests.

    app.use("/transactions", transactionsRouter(app));

    return router;
};