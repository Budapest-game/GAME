import Authorization from './authorization';

function mockFetch(data) {
  return jest.fn().mockImplementation(() => {
    return Promise.resolve({
      status: data.status,
      statusText: data.statusText,
      json: () => { return Promise.resolve(JSON.parse(data.body)); },
    });
  });
}
afterEach(() => {
  jest.clearAllMocks();
});

test('Запрос на вход', async () => {
  const data = { login: '', password: '' };
  global.fetch = mockFetch({ status: 401, statusText: 'Unauthorized' });
  const res = await Authorization.logIn(data);
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith('https://ya-praktikum.tech/api/v2/auth/signin', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(data),
  });
  expect(res.status).toBe(401);
  expect(res.text).toBe('Unauthorized');
});
test('Запрос на вход - JSON в body', async () => {
  global.fetch = mockFetch({ body: '{ "message": "string"}', status: 200, statusText: 'OK' });
  const res = await Authorization.logIn({ login: '', password: '' });
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(res.status).toBe(200);
  expect(res.text).toBe('OK');
});
test('Запрос на вход - кривой JSON в body', async () => {
  global.fetch = mockFetch({ body: '{ "messag}', status: 200, statusText: 'OK' });
  const res = await Authorization.logIn({ login: '', password: '' });
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(res.status).toBe(200);
  expect(res.text).toBe('OK');
  expect(res.body).toBe('');
});
test('Запрос на ВЫХОД', async () => {
  global.fetch = mockFetch({ status: 200, statusText: 'OK' });
  const res = await Authorization.logOut();
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith('https://ya-praktikum.tech/api/v2/auth/logout', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
  });
  expect(res.status).toBe(200);
  expect(res.text).toBe('OK');
});
