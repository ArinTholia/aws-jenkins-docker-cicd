const test = require('node:test');
const assert = require('node:assert');
const http = require('node:http');
const app = require('../server');

let server;
let baseUrl;

test.before(async () => {
  await new Promise((resolve) => {
    server = http.createServer(app).listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      baseUrl = `http://127.0.0.1:${port}`;
      resolve();
    });
  });
});

test.after(async () => {
  if (server) {
    await new Promise((resolve) => server.close(resolve));
  }
});

test('GET /health returns status UP', async () => {
  const res = await fetch(`${baseUrl}/health`);
  assert.strictEqual(res.status, 200);
  const body = await res.json();
  assert.strictEqual(body.status, 'UP');
});

test('GET /api/menu returns cafe menu items', async () => {
  const res = await fetch(`${baseUrl}/api/menu`);
  assert.strictEqual(res.status, 200);
  const menu = await res.json();
  assert.ok(Array.isArray(menu));
  assert.ok(menu.length > 0);
});

test('POST and DELETE /api/orders places and removes a 1-click food order', async () => {
  const createRes = await fetch(`${baseUrl}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      itemName: 'Test Cheese Pizza',
      emoji: '🍕',
      price: 299,
      customerName: 'Jenkins Automated Test'
    })
  });
  assert.strictEqual(createRes.status, 201);
  const order = await createRes.json();
  assert.strictEqual(order.itemName, 'Test Cheese Pizza');

  const delRes = await fetch(`${baseUrl}/api/orders/${order.id}`, {
    method: 'DELETE'
  });
  assert.strictEqual(delRes.status, 200);
});
