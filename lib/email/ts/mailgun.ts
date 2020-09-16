import * as HttpStatus from 'http-status-codes';
import * as dotenv from 'dotenv';
import * as mailgun from 'mailgun-js';

class MailgunService {
  private mailgun: any;

  constructor() {
    dotenv.config();
    const api_key = process.env.MAILGUN_API_KEY;
    const domain = process.env.MAILGUN_DOMAIN;
    this.mailgun = mailgun({ apiKey: api_key, domain: domain });
  }

  private validateMailBody = (body): string => {
    const { from, to, subject, text } = body;
    if (!from || !to || !subject || !text) return 'Please supply email body params';
  };

  public sendMail = async (body): Promise<any> => {
    this.validateMailBody(body);
    this.mailgun.messages().send(body, function (error, result) {
      if (error) {
        throw {
          message: error,
          data: null,
          code: HttpStatus.INTERNAL_SERVER_ERROR
        };
      }
      return result;
    });
  };
}
export default MailgunService;
