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

test('Регистрация', async () => {
  const data = { login: '', password: '' };
  global.fetch = mockFetch({ status: 401, statusText: 'Unauthorized' });
  await expect(Registration.create(data)).rejects.toThrow('Unauthorized');
});
test('Регистрация -  в body валидный JSON', async () => {
  const data = { login: '', password: '' };
  global.fetch = mockFetch({ body: '{ "message": "string"}', status: 200, statusText: 'OK' });
  const res = await Registration.create(data);
  expect(res).toBe(true);
});
test('Регистрация -  в body кривой JSON', async () => {
  const data = { login: '', password: '' };
  global.fetch = mockFetch({ body: '{ "messag', status: 200, statusText: 'OK' });
  const res = await Registration.create(data);
  expect(res).toBe(true);
});
