
const nodemailer = require('nodemailer');
const { pendingUsers } = require('../globalVariables')

require('dotenv').config();

const TIME_INTERVAL = 15000;

// Send email every 15 seconds
const start = () =>
    setInterval(() => {
      try {
        pendingUsers.forEach((user) => {
        if (user) {
          sendEmail(user);
        }
        });
      } catch (error) {
        console.log(error);
      } finally {
        pendingUsers.length = 0;
      }
    }, TIME_INTERVAL);

// Email settings
const sendEmail = (user) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    },
  });

  const mailOptions = {
    from: "do_not_reply@northpole.com",
    to: "santa@northpole.com",
    subject: "Gift from Santa",
    html: "<p>" + user.username + ",<br/>" + user.address + "<br/>" + user.wish + "</p>"
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = { start };