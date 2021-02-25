import UserApi from './user';

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

test('Запрос данных пользователя', async () => {
  global.fetch = mockFetch({ status: 401, statusText: 'Unauthorized' });
  await expect(UserApi.get()).rejects.toThrow('Unauthorized');
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith('https://ya-praktikum.tech/api/v2/auth/user', {
    credentials: 'include',
    method: 'GET',
    mode: 'cors',
  });
});
test('Запрос данных пользовател я- OK', async () => {
  global.fetch = mockFetch({ status: 200, body: '{"id":1}' });
  const res = await UserApi.get();
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith('https://ya-praktikum.tech/api/v2/auth/user', {
    credentials: 'include',
    method: 'GET',
    mode: 'cors',
  });
  expect(res.id).toBe(1);
});
test('Смена инфы пользователя', async () => {
  const testData = {
    first_name: 'string',
    second_name: 'string',
    display_name: 'string',
    login: 'string',
    email: 'string',
    phone: 'string',
  };
  global.fetch = mockFetch({ status: 200, body: '{"id":1}' });
  const res = await UserApi.changeInfo(testData);
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith('https://ya-praktikum.tech/api/v2/user/profile', {
    credentials: 'include',
    method: 'PUT',
    mode: 'cors',
    body: JSON.stringify(testData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
});
test('Смена инфы пользователя/Пароль', async () => {
  const testData = {
    oldPassword: 'string',
    newPassword: 'string',
  };
  global.fetch = mockFetch({ status: 200, body: '{"id":1}' });
  const res = await UserApi.changePassword(testData);
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith('https://ya-praktikum.tech/api/v2/user/password', {
    credentials: 'include',
    method: 'PUT',
    mode: 'cors',
    body: JSON.stringify(testData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
});
test('Смена инфы пользователя/Автатар', async () => {
  const testData = new FormData();
  const file = new File(['foo'], 'foo.txt', {
    type: 'text/plain',
  });
  testData.append('avatar', file);
  global.fetch = mockFetch({ status: 200, body: '{"id":1}' });
  const res = await UserApi.changeAvatar(testData);
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith('https://ya-praktikum.tech/api/v2/user/profile/avatar', {
    credentials: 'include',
    method: 'PUT',
    mode: 'cors',
    body: testData,
  });
});
