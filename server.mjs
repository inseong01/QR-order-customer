import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.NEXT_PUBLIC_HOSTNAME || '192.168.0.13';
const app = next({
  dev,
  hostname,
  port,
});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parseUrl = parse(req.url, true);
    handle(req, res, parseUrl);
  }).listen(port);

  console.log(
    `> Server listening at http://${hostname}:${port} as ${dev ? 'development' : process.env.NODE_ENV}`
  );
});
