import { BASE_API_URL, RATING_FIELD_NAME } from '../constants';
import Leaderboard from './leaderboard';

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

test('Добавление пользователя в лидерборд', async () => {
  const data = {
    id: 1, score: 10, avatar: 'null', name: 'name',
  };
  const expBody = { data, ratingFieldName: RATING_FIELD_NAME };
  global.fetch = mockFetch({ status: 200, statusText: 'Ok', body: '' });
  await Leaderboard.addLeader(data);
  expect(fetch).toHaveBeenCalledWith(`${BASE_API_URL}/leaderboard`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(expBody),
  });
});

test('Неудачная попытка добавить пользователя в лидерборд', async () => {
  global.fetch = mockFetch({ status: 401, statusText: 'Unauthorized', body: '' });
  await expect(Leaderboard.addLeader()).rejects.toThrow('Unauthorized');
  expect(fetch).toHaveBeenCalledWith(`${BASE_API_URL}/leaderboard`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify({ ratingFieldName: RATING_FIELD_NAME }),
  });
});

test('Получение данных лидерборда', async () => {
  const expBody = { ratingFieldName: RATING_FIELD_NAME, cursor: 0, limit: 10 };
  global.fetch = mockFetch({ status: 200, statusText: 'Ok', body: JSON.stringify([]) });
  await Leaderboard.get();
  expect(fetch).toHaveBeenCalledWith(`${BASE_API_URL}/leaderboard/all`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(expBody),
  });
});

test('Неудачная попытка получения данных  лидерборда', async () => {
  const expBody = { ratingFieldName: RATING_FIELD_NAME, cursor: 0, limit: 10 };
  global.fetch = mockFetch({ status: 401, statusText: 'Unauthorized', body: '' });
  await expect(Leaderboard.get()).rejects.toThrow('Unauthorized');
  expect(fetch).toHaveBeenCalledWith(`${BASE_API_URL}/leaderboard/all`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(expBody),
  });
});
