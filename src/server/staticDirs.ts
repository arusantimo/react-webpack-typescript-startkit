import * as path from 'path';
import * as express from 'express';

const PATH_STYLES = path.resolve(__dirname, '../app/styles');
const PATH_IMG = path.resolve(__dirname, '../app/img');
const PATH_DIST   = path.resolve(__dirname, '../../dist');
export function applyStaticDirs(app: express.Application) {
  app.use('/img', express.static(PATH_IMG));
  app.use('/styles', express.static(PATH_STYLES));
  app.use(express.static(PATH_DIST));
}