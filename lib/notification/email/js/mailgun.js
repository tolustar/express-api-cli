import HttpStatus from 'http-status-codes';
import dotenv from 'dotenv';
dotenv.config();
const api_key = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;
const mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

const validateMailBody = (body) => {
  const { from, to, subject, text } = body;
  if (!from || !to || !subject || !text) return 'Please supply email body params';
};

const sendMail = (data) => {
  validateMailBody(data);
  mailgun.messages().send(data, function (error, body) {
    if (error) {
      throw {
        message: error,
        data: null,
        code: HttpStatus.INTERNAL_SERVER_ERROR
      };
    }
    return body;
  });
};

module.exports = sendMail;
