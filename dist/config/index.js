"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
var path = require("path");
var envFound = dotenv.config();
if (!envFound) {
    throw new Error("Can't read .env file!");
}
exports.default = {
    mysql: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_SCHEMA,
    },
    port: parseInt(process.env.PORT, 10),
    secret_key: process.env.SECRET_KEY,
    lecturesDir: path.join(__dirname, "../../src/server/lectures")
};
//# sourceMappingURL=index.js.map