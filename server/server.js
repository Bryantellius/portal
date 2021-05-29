"use strict";
exports.__esModule = true;
var express_1 = require("express");
var morgan_1 = require("morgan");
var path_1 = require("path");
var routes_1 = require("./routes");
var config_1 = require("./config");
var passport_1 = require("passport");
require("./middleware/bearerstrategy");
require("./middleware/localstrategy");
var app = express_1["default"]();
app.use(express_1["default"].static("public"));
app.use(passport_1["default"].initialize());
app.use(express_1["default"].json());
app.use(morgan_1["default"]("dev"));
app.use(routes_1["default"]);
app.use("*", function (req, res, next) {
    try {
        res.sendFile(path_1["default"].join(__dirname, "../public/index.html"));
    }
    catch (error) {
        next(error);
    }
});
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(500).json({ name: err.name, msg: err.message });
});
app.listen(config_1["default"].port, function () {
    return console.log("Server listening on port " + config_1["default"].port);
});
