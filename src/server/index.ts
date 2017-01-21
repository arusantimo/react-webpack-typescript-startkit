import 'babel-polyfill';
import * as program from 'commander';
import { Server } from 'net';
import { sendEmail } from './services/email';
import { getServerApp } from './server';

export function runServer(args: {
  port: number, withoutCsp?: boolean,
  withoutLogging?: boolean,
}): PromiseLike<Server> {
  return new Promise((resolve, reject) => {
    const serverApp = getServerApp(args);
    const server = serverApp.listen(args.port, (err: Error) => {
      if (err) {
        reject(err);
        return;
      }
      const port = server.address().port;
      console.log(`Server listening at: ${port}`);
      resolve(server);
    });
  });
}

if (require.main === module) {
  program
    .version('0.0.1')
    .option('--without-csp', 'Without Content Security Policy')
    .option('--fast', 'ts-node fast option')
    .parse(process.argv)

  const withoutCsp = !(!program['withoutCsp']);
  runServer({
    port: process.env.PORT || 8000,
    withoutCsp,
  })
}

process.on('unhandledRejection', (reason: any, p: any) => {
  console.log('Reason: ' + reason);
  console.error(p);
});

process.on('uncaughtException', async (err: Error) => {
  console.error('Uncaught Exception: ', err.message);
  await sendEmail({
    subject: `uncaughtException::${err.message}`,
    text: `
      uncaughtException:
        ${err.message}
      StackTrace:
        ${err.stack.toString()}
    `,
    html: `
      <pre>
        ${err.message}
      </pre>

      <pre>
        ${err.stack.toString()}
      </pre>
    `,
  });
  process.exit();
});