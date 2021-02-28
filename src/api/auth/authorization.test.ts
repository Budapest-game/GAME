import { BASE_API_URL } from '../constants';
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

test('Отказ во входе с пустым логином и паролем ', async () => {
  const data = { login: '', password: '' };
  global.fetch = mockFetch({ status: 401, statusText: 'Unauthorized', body: '' });
  await expect(Authorization.logIn(data)).rejects.toThrow('Unauthorized');
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(`${BASE_API_URL}/auth/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(data),
  });
});
test('Успешный вход ответ 200', async () => {
  global.fetch = mockFetch({ body: '{ "message": "string"}', status: 200, statusText: 'OK' });
  const res = await Authorization.logIn({ login: '', password: '' });
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(res).toBe(true);
});

test('Успешный выход', async () => {
  global.fetch = mockFetch({ status: 200, statusText: 'OK', body: '' });
  await Authorization.logOut();
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(`${BASE_API_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
  });
});
