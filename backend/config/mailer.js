const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "saverigavvala207@gmail.com",
    pass: "exaagzwqmqvcwlyn"

  }
});

module.exports = transporter;