import {
  Application,
} from 'express';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';

export function applyMiddlewares(app: Application) {
  app.use(compression());

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({
    extended: true,
  }));

  // parse application/json
  app.use(bodyParser.json());

  // parse application/vnd.
  app.use(bodyParser.json({
    type: 'application/vnd.api+json',
  }));
}