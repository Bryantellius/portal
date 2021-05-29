import mailgunLoader from "mailgun-js";

const mg = mailgunLoader({
  apiKey: process.env.MAILGUNAPIKEY,
  domain: process.env.MAILGUNDOMAIN,
});

const sendEmail = (to: string, content: string, link?: string) => {
  const todaysDate: Date = new Date();

  let data = {
    to,
    from: "support@truecoders.io",
    subject: "TrueCoders - Account Update",
    text: content,
    html: `<h1>Test</h1><p>${todaysDate.toLocaleDateString()}</p><a href='${link}'>Update Info</a>`,
  };
  return mg.messages().send(data);
};

export { sendEmail };
