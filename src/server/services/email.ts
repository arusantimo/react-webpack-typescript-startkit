import * as _ from 'lodash';
import * as nodemailer from 'nodemailer';

import {
  MAIL_TO, MAIL_FROM,
} from '../configs';

const mailTransport = nodemailer.createTransport();

export function sendEmail(args: {
  text: string,
  html: string,
  subject: string,
}): Promise<any> {
  return new Promise((resolve, reject) => {
    const emailToSend = _.assign({
      from: MAIL_FROM,
      to: MAIL_TO,
    }, args);

    mailTransport.sendMail(
      emailToSend,
      (error, info) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(info);
      }
    );
  });
}