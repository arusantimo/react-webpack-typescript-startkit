import { Application } from 'express';

export function applyPingEndpoint(app: Application) {
  app.get('/ping', (req, resp) => {
    resp.status(200).send('');
  });
}