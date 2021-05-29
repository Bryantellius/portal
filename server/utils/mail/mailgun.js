"use strict";
exports.__esModule = true;
exports.sendEmail = void 0;
var mailgun_js_1 = require("mailgun-js");
var mg = mailgun_js_1["default"]({
    apiKey: process.env.MAILGUNAPIKEY,
    domain: process.env.MAILGUNDOMAIN
});
var sendEmail = function (to, content, link) {
    var todaysDate = new Date();
    var data = {
        to: to,
        from: "support@truecoders.io",
        subject: "TrueCoders - Account Update",
        text: content,
        html: "<h1>Test</h1><p>" + todaysDate.toLocaleDateString() + "</p><a href='" + link + "'>Update Info</a>"
    };
    return mg.messages().send(data);
};
exports.sendEmail = sendEmail;
