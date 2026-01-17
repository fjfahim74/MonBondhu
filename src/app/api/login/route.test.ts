/** @jest-environment node */
import { POST } from '@/app/api/login/route';

function makeRequest(body: unknown) {
  return new Request('http://localhost/api/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
}

test('login API returns ok for valid payload', async () => {
  const res = await POST(makeRequest({ email: 'user@example.com', password: 'abcdef' }));
  expect(res.status).toBe(200);
  const json = await res.json();
  expect(json.ok).toBe(true);
});

test('login API returns 400 for invalid payload', async () => {
  const res = await POST(makeRequest({ email: 'bad', password: '123' }));
  expect(res.status).toBe(400);
  const json = await res.json();
  expect(json.ok).toBe(false);
});
