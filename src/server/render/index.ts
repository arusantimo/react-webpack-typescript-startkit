import * as path from 'path';
import * as fs from 'fs';
import * as mustache from 'mustache';
import { Application, RequestHandler } from 'express';
import { getResponseNonce } from '../contentSecurityPolicy';

export function applyRender(app: Application) {
  app.get('*', serverSideHandler);
}

export const serverSideHandler: RequestHandler = (req, resp, next) => {
  const nonce = getResponseNonce(resp);
  const renderedHTML = renderTemplate({
    nonce,
  });
  resp.status(200)  /****/
    .type('html')
    .send(renderedHTML);
}

const templateFile = fs.readFileSync(
  path.join(__dirname, 'index.html')
);

const templateString = templateFile.toString();
mustache.parse(templateString);

export function renderTemplate(args: {
  nonce: string,
}) {

return mustache.render(templateString, {
    nonce: args.nonce,
  });
}
