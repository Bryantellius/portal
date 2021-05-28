"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var config_1 = require("../../config");
var connection = mysql.createPool(config_1.default.mysql);
var Query = function (query, values) {
    return new Promise(function (resolve, reject) {
        connection.query(query, values, function (err, results) {
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });
};
exports.default = Query;
//# sourceMappingURL=index.js.map