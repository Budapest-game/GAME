import fetch from 'node-fetch';
import Authorization from './authorization';

global.fetch = fetch;
test('Авторизация - Unauthorized', async () => {
  const res = await Authorization.logIn({ login: '', password: '' });
  expect(res.status).toBe(401);
  expect(res.text).toBe('Unauthorized');
});
test('Авторизация - Bad Request ', async () => {
  const res = await Authorization.logIn({ login: '', passworxd: '' });
  expect(res.status).toBe(400);
  expect(res.text).toBe('Bad Request');
});
test('Авторизация - Loging 200 ', async () => {
  const res = await Authorization.logIn({ login: 'budapestTestUser', password: 'string' });
  expect(res.status).toBe(200);
  expect(res.text).toBe('OK');
});
test('Выход', async () => {
  const res = await Authorization.logOut();
  expect(res.status).toBe(401);
  expect(res.text).toBe('Unauthorized');
});
