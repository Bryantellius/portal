"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
var mailgunLoader = require("mailgun-js");
var mg = mailgunLoader({
    apiKey: process.env.MAILGUNAPIKEY,
    domain: process.env.MAILGUNDOMAIN,
});
var sendEmail = function (to, content, link) {
    var todaysDate = new Date();
    var data = {
        to: to,
        from: "support@truecoders.io",
        subject: "TrueCoders - Account Update",
        text: content,
        html: "<h1>Test</h1><p>" + todaysDate.toLocaleDateString() + "</p><a href='" + link + "'>Update Info</a>",
    };
    return mg.messages().send(data);
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=mailgun.js.map