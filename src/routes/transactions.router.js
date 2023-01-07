const express = require("express");
const router  = express.Router();

const dataHelper = require("../helpers/database.helper.js");

module.exports = (app) => {
    // START: GET request routes
    router.get("/view/all", (request, response) => {
        response.send(dataHelper.select("SELECT * FROM transactions"));
    });

    router.get("/view/all/:t_type", (request, response) => {
        response.send(dataHelper.select("SELECT * FROM transactions WHERE t_type=" + request.params.t_type));
    });

    router.get("/view/:transaction_id", (request, response) => {
        response.send(dataHelper.select("SELECT * FROM transactions WHERE transaction_id='" + request.params.transaction_id + "'"));
    });
    // END: GET request routes

    // START: POST request routes
    router.post("/new", (request, response) => {
        let transactionData = {
            "transaction_id": request.body.transaction_id,
            "t_type":         request.body.t_type,
            "admin_id":       request.body.admin_id,
            "product_id":     request.body.product_id,
            "qty_change":     request.body.qty_change,
            "note":           request.body.note,
            "date":           request.body.date
        };

        dataHelper.insert("transactions", transactionData);

        response.send(200);
    });
    // END: POST request routes

    return router;
};