import {
  Application,
  RequestHandler,
  Response,
} from 'express';

import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';
import * as uuid from 'node-uuid';

import { UAParser } from 'ua-parser-js';
import { sendEmail } from './services/email';
import {
  MAIL_FROM, MAIL_TO,
} from './configs';

export function applyContentSecurityPolicy(app: Application) {
  // Note: Using hash-sum for CSP would be better for security,
  //        but I couldn't make it work on multiple browsers.
  //        (+ implementing hash-sum generation for each
  //          <script> tag would be painful / ugly
  //        )
  app.use(nonceMiddleware);
  app.use(helmet.contentSecurityPolicy({
    directives: {
      scriptSrc: [
        `'self'`,
        `'unsafe-inline'`,
        (req, resp) => {
          const nonce = getResponseNonce(resp);
          return `'nonce-${nonce}'`;
        },
      ],
      reportUri: '/csp-violations'
    }
  }));
  app.use(bodyParser.json({ type: 'application/csp-report'}));
  app.post('/csp-violations', cspReportHandler);
}

export function setResponseNonce(resp: Response, nonce: string) {
  resp.locals['nonce'] = nonce;
}

export function getResponseNonce(resp: Response) {
  const nonce: string = resp.locals['nonce'];
  return nonce;
}

export const nonceMiddleware: RequestHandler =
    (req, resp, next) => {
  const nonce = uuid.v4();
  setResponseNonce(resp, nonce);
  next();
}

export const cspReportHandler: RequestHandler =
    async (req, resp) => {

  const content = JSON.stringify(req['body']);
  console.error(req['body'])
  const parser = new UAParser(req.headers['user-agent']);
  const browser = parser.getBrowser();
  const device = parser.getDevice();
  const os = parser.getOS();
  await sendEmail({
    subject:
      `iRoboManagement-CSP-Violation::${browser.name}:${browser.version}:${os.name}:${os.version}:${device.model}`,
    text: `
      iRoboManagement CSP Violation:
      Browser:
        ${JSON.stringify(parser.getResult())}
      violation:
        ${JSON.stringify(content)}
    `,
    html: `
      <h2>iRoboManagement CSP Violation:</h2>
      <h3>Browser:</h3>
        ${JSON.stringify(parser.getResult())}
      <h3>violation:</h3>
        ${JSON.stringify(content)}
    `,
  });
  resp.status(200).send('CSP violation reported');
}