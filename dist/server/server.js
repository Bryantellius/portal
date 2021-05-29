"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("./routes"));
const config_1 = __importDefault(require("./config"));
const passport_1 = __importDefault(require("passport"));
require("./middleware/bearerstrategy");
require("./middleware/localstrategy");
const app = express_1.default();
app.use(express_1.default.static("public"));
app.use(passport_1.default.initialize());
app.use(express_1.default.json());
app.use(morgan_1.default("dev"));
app.use(routes_1.default);
app.use("*", (req, res, next) => {
    try {
        res.sendFile(path_1.default.join(__dirname, "../public/index.html"));
    }
    catch (error) {
        next(error);
    }
});
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ name: err.name, msg: err.message });
});
app.listen(config_1.default.port, () => console.log("Server listening on port " + config_1.default.port));
//# sourceMappingURL=server.js.map