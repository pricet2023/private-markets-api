import request from 'supertest';
import { startTestServer, stopTestServer } from '@/test-utils/server';

const baseUrl: string = "http://localhost:3000";

beforeAll(async () => {
  // baseUrl = await startTestServer();
});

afterAll(async () => {
  // await stopTestServer();
});

let fundId: string;

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
    
    fundId = res.body.id;
  });

  it('should get the fund we just created', async () => {
    const res = await request(baseUrl).get(`/funds/${fundId}`)  

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Test Fund');
  })

  it('should get the fund in an array', async () => {
    const res = await request(baseUrl).get(`/funds`)  
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);

    const fund = res.body[0];
    expect(fund).toHaveProperty('id');
    expect(fund.name).toBe('Test Fund');
  })

  it('should update the fund', async () => {
    const res = await request(baseUrl)
      .put(`/funds`)
      .send({
        id: fundId,
        name: 'Test Fund 2',
      })
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Test Fund 2');
  });

});