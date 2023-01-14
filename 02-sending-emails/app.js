const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

// setup .env variables
dotenv.config();

// select the mail service and authentication
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// Setup the mail options
const mailOptions = {
  from: process.env.Email,
  to: "dev.johnmwendwa@gmail.com",
  subject: "Sending Email usng Node.js",
  html: "<h1>Welcome</h1><p>That was easy!</p>",
};

// create function to send the email
const sendEmail = () =>
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });

//   Invoke the sendEmal function
sendEmail();
