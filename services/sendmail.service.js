const { emailApi, sender, link } = require("../api/config");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(emailApi);

const sendMail = async (recipient, token, message = "Follow this link") => {
  const msg = {
    to: recipient,
    from: sender,
    subject: "Email verification",
    text: message,
    html: `<a href=${link}${token}>${message}</a>`,
  };
  await sgMail.send(msg);
};

module.exports = {
  sendMail,
};
