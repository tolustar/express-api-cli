import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import HttpStatus from 'http-status-codes';
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_KEY);

const sendMail = async (body) => {
  const { email, subject, template } = body;

  if (!template || !email || !subject) {
    throw {
      message: 'Please supply email,subject and template',
      data: null,
      code: HttpStatus.INTERNAL_SERVER_ERROR
    };
  }

  await sgMail.send(body);
  return 'Mail Sent Successfully';
};

module.exports = sendMail;
