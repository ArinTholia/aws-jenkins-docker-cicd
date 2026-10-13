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

test('GET /health returns status UP and container telemetry', async () => {
  const res = await fetch(`${baseUrl}/health`);
  assert.strictEqual(res.status, 200);
  const body = await res.json();
  assert.strictEqual(body.status, 'UP');
  assert.ok(body.containerId);
});

test('GET /api/build-info returns all 4 mandatory DevOps tools', async () => {
  const res = await fetch(`${baseUrl}/api/build-info`);
  assert.strictEqual(res.status, 200);
  const body = await res.json();
  assert.strictEqual(body.appName, 'CloudPulse CI/CD');
  assert.strictEqual(body.tools.length, 4);
});

test('POST and DELETE /api/tasks performs dynamic CRUD operations', async () => {
  // 1. Create a task
  const createRes = await fetch(`${baseUrl}/api/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: 'Automated Jenkins CI Test Task',
      category: 'Jenkins CI/CD',
      priority: 'High',
      assignee: 'Jenkins Bot'
    })
  });
  assert.strictEqual(createRes.status, 201);
  const created = await createRes.json();
  assert.strictEqual(created.title, 'Automated Jenkins CI Test Task');

  // 2. Delete the test task to keep store clean
  const delRes = await fetch(`${baseUrl}/api/tasks/${created.id}`, {
    method: 'DELETE'
  });
  assert.strictEqual(delRes.status, 200);
});
