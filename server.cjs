/* eslint-disable @typescript-eslint/no-require-imports -- Passenger CommonJS entry point. */
const http = require('node:http');
const next = require('next');
const { config } = require('./.next/required-server-files.json');
const passenger = typeof PhusionPassenger !== 'undefined';
if (passenger) PhusionPassenger.configure({ autoInstall: false });
const app = next({ dev: false, dir: __dirname, conf: config });
const handle = app.getRequestHandler();
app.prepare().then(() => {
  const server = http.createServer((req, res) => {
    Promise.resolve(handle(req, res)).catch(() => {
      if (!res.headersSent) res.writeHead(500);
      res.end('Internal server error');
    });
  });
  if (passenger) server.listen('passenger');
  else server.listen(Number(process.env.PORT || 3000), '127.0.0.1');
}).catch(() => { console.error('Application startup failed'); process.exit(1); });
