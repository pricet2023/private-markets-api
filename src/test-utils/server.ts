import { createServer, Server } from 'http';
import next from 'next';
import type { AddressInfo } from 'net';

let server: Server;
let baseUrl: string;

export async function startTestServer() {
  const app = next({ dev: true });
  const handle = app.getRequestHandler();
  await app.prepare();

  server = createServer((req, res) => handle(req, res));

  await new Promise<void>((resolve) => {
    server.listen(0, () => resolve());
  });

  const { port } = server.address() as AddressInfo;
  baseUrl = `http://localhost:${port}`;
  return baseUrl;
}

export async function stopTestServer() {
  if (server) {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
}