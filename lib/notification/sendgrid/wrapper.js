import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_KEY);

const processMail = async (data) => {
  return new Promise((resolve, reject) => {
    sgMail.send(data).then(
      () => {
        resolve('Mail Sent Successfully');
      },
      (error) => {
        reject(new Error(error));
      }
    );
  });
};

const sendMail = async (body) => {
  const { email, subject, template } = body;

  return new Promise(async (resolve, reject) => {
    if (!template || !email || !subject) {
      reject('Please supply email,subject and template');
    }
    try {
      const response = await processMail({
        to: email,
        from: process.env.SENDGRID_FROM,
        subject,
        html: template
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = sendMail;
