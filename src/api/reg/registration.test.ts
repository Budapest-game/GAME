import { BASE_API_URL } from '../constants';
import Registration from './registration';

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

test('Неудачная регистрация с пустыми логином и паролем', async () => {
  const data = { login: '', password: '' };
  global.fetch = mockFetch({ status: 401, statusText: 'Unauthorized', body: '' });
  await expect(Registration.create(data)).rejects.toThrow('Unauthorized');
  expect(fetch).toHaveBeenCalledWith(`${BASE_API_URL}/auth/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(data),
  });
});
test('Успешная регистрация ', async () => {
  const data = { login: '', password: '' };
  global.fetch = mockFetch({ body: '{ "message": "string"}', status: 200, statusText: 'OK' });
  const res = await Registration.create(data);
  expect(fetch).toHaveBeenCalledWith(`${BASE_API_URL}/auth/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(data),
  });
  expect(res).toBe(true);
});
