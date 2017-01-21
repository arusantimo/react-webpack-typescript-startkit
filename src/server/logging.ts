import {
  Application,
} from 'express';
import * as morgan from 'morgan';
export function applyLogging(app: Application) {
  // log every request to the console
  app.use(morgan('dev'));
}