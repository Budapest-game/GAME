import fetch from 'node-fetch';
import Registration from './registration';

global.fetch = fetch;
test('Регистрация  - Bad Request', async () => {
  const res = await Registration.create({});
  expect(res.status).toBe(400);
  expect(res.text).toBe('Bad Request');
});
test('Регистрация  - X already exists', async () => {
  const res = await Registration.create({
    first_name: 'budapestTestUser',
    second_name: 'budapestTestUser',
    login: 'budapestTestUser',
    email: '1@1.com',
    password: 'string',
    phone: '123456789',
  });
  expect(res.status).toBe(409);
  expect(res.text).toBe('Conflict');
});
test('Регистрация  - OK', async () => {
  const randomStr = Math.random().toString(12);
  const res = await Registration.create({
    first_name: randomStr,
    second_name: randomStr,
    login: randomStr,
    email: `${randomStr}@m.com`,
    password: 'string',
    phone: '123456789',
  });
  expect(res.status).toBe(200);
  expect(res.text).toBe('OK');
});
