const express = require("express");
const router  = express.Router();

const dataHelper = require("../helpers/database.helper.js");

module.exports = (app) => {
    // START: GET request routes
    router.get("/list", (request, response) => {
        response.send(dataHelper.select("SELECT * FROM product"));
    });

    router.get("/productByTag/:tag", (request, response) => {
        response.send(dataHelper.select("SELECT * FROM product WHERE product_tag='" + request.params.tag + "'"));
    });
    // END: GET request routes

    // START: POST request routes
    router.post("/create", (request, response) => {
        let productData = {
            "product_tag":     request.body.product_tag,
            "product_name":    request.body.product_name,
            "product_qty":     request.body.product_qty,
            "product_reorder": request.body.product_reorder,
            "exp_date":        request.body.exp_date,
            "checkout_count":  0,
            "ordered":         0
        };

        dataHelper.insert("product", productData);

        response.send(200);
    });
    // END: POST request routes

    return router;
};