import dotenv from 'dotenv';
dotenv.config();
const api_key = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;
const mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

export const processEmail = (data) => {
  validateMailBody(data);
  return new Promise((resolve, reject) => {
    mailgun.messages().send(data, function (error, body) {
      if (error) {
        reject(error);
      }
      resolve(body);
    });
  });
};

const validateMailBody = (body) => {
  const { from, to, subject, text } = body;
  if (!from || !to || !subject || !text) return 'Please from email body params';
};
