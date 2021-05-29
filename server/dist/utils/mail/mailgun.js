"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const mailgun_js_1 = __importDefault(require("mailgun-js"));
const mg = mailgun_js_1.default({
    apiKey: process.env.MAILGUNAPIKEY,
    domain: process.env.MAILGUNDOMAIN,
});
const sendEmail = (to, content, link) => {
    const todaysDate = new Date();
    let data = {
        to,
        from: "support@truecoders.io",
        subject: "TrueCoders - Account Update",
        text: content,
        html: `<h1>Test</h1><p>${todaysDate.toLocaleDateString()}</p><a href='${link}'>Update Info</a>`,
    };
    return mg.messages().send(data);
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=mailgun.js.map