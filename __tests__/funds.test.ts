import request from 'supertest';
import { startTestServer, stopTestServer } from '@/test-utils/server';

let baseUrl: string;

beforeAll(async () => {
  baseUrl = await startTestServer();
});

afterAll(async () => {
  await stopTestServer();
});

describe('Funds API', () => {
  it('should return an empty array initially', async () => {
    const res = await request(baseUrl).get('/funds');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should create a new fund', async () => {
    const res = await request(baseUrl)
      .post('/funds')
      .send({
        name: 'Test Fund',
        vintage_year: 2024,
        target_size_usd: 1000000,
        status: 'Fundraising',
      })
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Test Fund');
  });
});