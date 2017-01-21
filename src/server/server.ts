import * as path from 'path';
import * as fs from 'fs';
import * as express from 'express';

import { applyLogging } from './logging';
import { applyMiddlewares } from './middlewares';
import { applyHelmetMiddleware } from './helmet';
import { applyContentSecurityPolicy } from './contentSecurityPolicy';
import { applyStaticDirs } from './staticDirs';
import { applyPingEndpoint } from './pingEndpoint';
import { applyRender } from './render';

export function getServerApp(opts?: {
  withoutCsp?: boolean,
  withoutLogging?: boolean,
}) {
  const {
    withoutCsp,
    withoutLogging,
  } = opts;
  const app = express();
  applyMiddlewares(app);
  applyHelmetMiddleware(app);
  if (!withoutCsp) {
    applyContentSecurityPolicy(app);
  }
  if (!withoutLogging) {
    applyLogging(app);
  }
  applyStaticDirs(app);
  applyPingEndpoint(app);
  applyRender(app);
  return app;
}
