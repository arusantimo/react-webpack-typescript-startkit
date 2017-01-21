import { Application } from 'express';
import * as helmet from 'helmet';

export function applyHelmetMiddleware(app: Application) {
  app.use(helmet());
}