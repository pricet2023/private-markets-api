import { spawn } from 'child_process';
import waitOn from 'wait-on';

let serverProcess: ReturnType<typeof spawn>;
const TEST_PORT = 3000;

const baseUrl = `http://localhost:${TEST_PORT}`;

export async function startTestServer() {

  serverProcess = spawn('docker-compose', ['up', '--build'], {
    env: { ...process.env },
    stdio: 'inherit',
  });

  await waitOn({ resources: [baseUrl], timeout: 120000 });
  return baseUrl;
}

export async function stopTestServer() {
  if (serverProcess) {
    serverProcess.kill('SIGTERM');
  }
}